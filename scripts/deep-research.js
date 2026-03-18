#!/usr/bin/env node
/**
 * Deep Research Tool for OpenClaw
 * 自动迭代研究直到获得最优结果
 * 
 * 使用方法:
 * node deep-research.js "研究主题"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  maxIterations: parseInt(process.env.RESEARCH_MAX_ITER) || 100,
  outputDir: process.env.RESEARCH_OUTPUT_DIR || 'memory/research',
  minFindingsPerRound: 2,
  convergenceThreshold: 0.8
};

const log = (msg) => console.error(`[Research] ${msg}`);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function search(query, iteration) {
  log(`第 ${iteration} 轮搜索: ${query}`);
  try {
    const result = execSync(
      `miaoda-studio-cli search-summary --query "${query}" --limit 5`,
      { encoding: 'utf-8', timeout: 30000 }
    );
    return parseSearchResults(result);
  } catch (e) {
    log(`搜索工具不可用，使用模拟数据`);
    return [{
      title: `关于 "${query}" 的信息`,
      content: `这是第 ${iteration} 轮搜索的模拟结果。`,
      source: 'simulated'
    }];
  }
}

function parseSearchResults(output) {
  const lines = output.split('\n').filter(l => l.trim());
  return lines.slice(0, 5).map((line, i) => ({
    title: `搜索结果 ${i + 1}`,
    content: line,
    source: 'web'
  }));
}

function analyzeQuality(findings) {
  let score = 0;
  const content = findings.map(f => f.content).join(' ');
  if (/\d+%|\d+个|\d+倍/.test(content)) score += 2;
  if (findings.some(f => f.source !== 'simulated')) score += 2;
  if (/vs|对比|区别/.test(content)) score += 1;
  if (/步骤|流程|如何/.test(content)) score += 1;
  if (content.length > 500) score += 1;
  return { score, maxScore: 7 };
}

function hasConverged(current, previous) {
  if (!previous || previous.length === 0) return false;
  return current.map(f => f.content).join('') === previous.map(f => f.content).join('');
}

function generateNextQueries(topic, iteration) {
  if (iteration === 1) return [`${topic} 教程`, `${topic} 入门`];
  if (iteration === 2) return [`${topic} 最佳实践`, `${topic} 常见问题`];
  return [`${topic} 高级技巧`, `${topic} 案例分析`];
}

function generateReport(topic, allRounds) {
  const timestamp = new Date().toLocaleString('zh-CN');
  const dateStr = new Date().toISOString().split('T')[0];
  
  let findingsSection = '';
  allRounds.forEach((round, idx) => {
    findingsSection += `### 第 ${idx + 1} 轮发现\n\n`;
    round.findings.forEach((f, i) => {
      findingsSection += `${i + 1}. **${f.title}**\n   - ${f.content.substring(0, 200)}\n\n`;
    });
    findingsSection += `*质量评分: ${round.quality.score}/${round.quality.maxScore}*\n\n`;
  });

  return {
    content: `# 深度研究报告：${topic}\n\n**研究时间：** ${timestamp}\n**迭代轮数：** ${allRounds.length} 轮\n\n## 核心发现\n\n${findingsSection}\n---\n*由 Deep Research Skill 自动生成*`,
    dateStr
  };
}

function saveReport(topic, report) {
  const outputDir = path.resolve(CONFIG.outputDir);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const safeTopic = topic.replace(/[^\w\s-]/g, '').substring(0, 30).trim().replace(/\s+/g, '_');
  const filepath = path.join(outputDir, `${safeTopic}-${report.dateStr}.md`);
  fs.writeFileSync(filepath, report.content, 'utf-8');
  return filepath;
}

async function runResearch(topic) {
  log(`🚀 启动深度研究: ${topic}`);
  const allRounds = [];
  let previousFindings = [];
  
  for (let i = 1; i <= CONFIG.maxIterations; i++) {
    log(`📚 开始第 ${i} 轮研究...`);
    const queries = i === 1 ? [topic] : generateNextQueries(topic, i);
    const findings = await search(queries[0], i);
    const quality = analyzeQuality(findings);
    log(`📊 质量评分: ${quality.score}/${quality.maxScore}`);
    
    const converged = hasConverged(findings, previousFindings);
    allRounds.push({ iteration: i, query: queries[0], findings, quality, converged });
    previousFindings = findings;
    
    if (converged || quality.score >= 6) break;
    if (i < CONFIG.maxIterations) await sleep(1000);
  }
  
  const report = generateReport(topic, allRounds);
  const filepath = saveReport(topic, report);
  log(`✅ 研究完成！报告已保存: ${filepath}`);
  return { status: 'success', topic, iterations: allRounds.length, reportPath: filepath };
}

async function main() {
  const topic = process.argv[2] || process.env.RESEARCH_TOPIC;
  if (!topic) {
    console.error('❌ 请提供研究主题');
    console.error('用法: node deep-research.js "研究主题"');
    process.exit(1);
  }
  try {
    const result = await runResearch(topic);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('❌ 研究失败:', err.message);
    process.exit(1);
  }
}

main();
