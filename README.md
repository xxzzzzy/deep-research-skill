# 🔬 Deep Research Skill

> **自动迭代研究工具** - 让 AI Agent 像科学家一样持续搜索、分析、验证，直到获得最优结果。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-blue.svg)](https://github.com/openclaw)

## 灵感来源

本项目灵感来源于 [Karpathy's AutoResearch](https://github.com/karpathy/autoresearch) - 一个让 AI Agent 自动进行 ML 模型研究的实验项目。

> *"One day, frontier AI research used to be done by meat computers in between eating, sleeping..."* - @karpathy

AutoResearch 的核心理念是：**让 AI 自动迭代实验，修改代码 → 训练 → 评估 → 继续改进**。

Deep Research Skill 将这个理念迁移到了**通用信息研究**场景：
- 不再是优化模型，而是**优化知识**
- 不再是训练循环，而是**搜索循环**
- 不再是评估 loss，而是**评估信息质量**

## 核心特性

| 特性 | 说明 |
|------|------|
| 🔄 自动迭代 | 多轮搜索直到信息饱和 |
| 📊 质量评估 | 自动评估信息质量（数据、来源、对比、细节） |
| ⏹️ 智能收敛 | 无新发现时自动停止 |
| 📝 结构化报告 | 自动生成 Markdown 报告 |
| 🎯 目标导向 | 聚焦用户核心问题 |

## 安装

### 方式 1：手动安装

```bash
# 克隆仓库
git clone https://github.com/xxzzzzy/deep-research-skill.git

# 复制到 OpenClaw skills 目录
cp -r deep-research-skill /path/to/openclaw/skills/deep-research

# 确保脚本可执行
chmod +x /path/to/openclaw/skills/deep-research/scripts/*.sh
```

### 方式 2：直接下载

```bash
# 下载最新版本
curl -L https://github.com/xxzzzzy/deep-research-skill/archive/refs/heads/main.tar.gz -o deep-research.tar.gz

# 解压到 skills 目录
mkdir -p /path/to/openclaw/skills/deep-research
tar -xzf deep-research.tar.gz -C /path/to/openclaw/skills/deep-research --strip-components=1
```

## 使用方法

### 在 OpenClaw 中使用

只需在对话中输入触发词：

```
研究一下 Rust 异步编程
深度研究 AI Agent 框架
帮我调研一下本地 LLM 部署方案
分析一下 PostgreSQL vs MySQL
```

Agent 会自动识别并启动研究循环。

### 命令行使用

```bash
# Node.js 版本
node scripts/deep-research.js "研究主题"

# Python 版本
python3 scripts/research-loop.py "研究主题"

# Shell 版本
./scripts/run-research.sh "研究主题"
```

## 与 AutoResearch 对比

| 特性 | Karpathy's AutoResearch | Deep Research Skill |
|------|------------------------|---------------------|
| **目标** | ML 模型自动优化 | 通用信息深度研究 |
| **核心循环** | 修改代码 → 训练 → 评估 | 搜索 → 分析 → 深入 |
| **停止条件** | 性能指标收敛 | 信息饱和/质量达标 |
| **输出** | 优化后的模型权重 | 结构化研究报告 |
| **适用场景** | 编程/实验 | 调研/决策/学习 |

## 致谢

- 灵感来源：[Karpathy's AutoResearch](https://github.com/karpathy/autoresearch)
- 核心理念：让 AI 自主迭代优化

## License

MIT License - 自由使用和修改

---

**Made with ❤️ for OpenClaw**