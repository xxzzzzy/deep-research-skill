# Deep Research Skill 中文说明

这是一个处于早期阶段的开源深度研究工具。它通过 OpenAI Responses API 的网页搜索能力执行多轮、有限制的资料研究，并将研究笔记整理成带来源链接的 Markdown 报告。

[English README](README.md) | [开发路线图](ROADMAP.md) | [参与贡献](CONTRIBUTING.md)

## 研究流程

1. 搜索资料，优先使用官方、论文等一手或权威来源。
2. 将前一轮研究笔记提供给下一轮。
3. 要求下一轮寻找遗漏、争议、新证据和缺少的一手来源。
4. 达到设定的研究轮数后停止。
5. 将全部研究笔记合并为结构化报告。

## 当前能力

- 接入 OpenAI Responses API；
- 在研究轮次中使用网页搜索；
- 可以配置模型、研究轮数、单次输出 Token 上限和报告目录；
- 汇总 API 返回的 Token 使用量；
- 生成 Markdown 研究报告；
- 核心流程可注入模拟客户端，因此自动化测试不消耗 API。

## 当前限制

- 项目仍是实验原型，不能保证事实完全正确；
- 生成的引用和结论仍需要人工核验；
- 当前按固定轮数停止，还没有实现真正的语义收敛判断；
- Token 限制针对每次请求，还没有实现总金额预算；
- 自动化测试验证程序流程和限制，不验证实时研究结果的事实质量。

## 安装

需要 Node.js 20 或更新版本。

```bash
git clone https://github.com/xxzzzzy/deep-research-skill.git
cd deep-research-skill
npm install
```

PowerShell 中设置 API 密钥：

```powershell
$env:OPENAI_API_KEY = "你的 API 密钥"
```

不要把 API 密钥写进代码、README、`.env` 示例值或提交记录。

## 使用

```bash
npm run research -- "比较 PostgreSQL 和 MySQL 哪个更适合小型 SaaS"
```

默认报告保存在 `reports/`。命令结束时还会显示研究轮数和 API 返回的 Token 用量。

## 配置

| 环境变量 | 默认值 | 用途 |
| --- | --- | --- |
| `RESEARCH_MODEL` | `gpt-5-mini` | 研究和整理报告使用的模型 |
| `RESEARCH_MAX_ITER` | `3` | 研究轮数，程序限制在 1-5 轮 |
| `RESEARCH_MAX_TOKENS` | `2500` | 每次 API 请求的最大输出 Token |
| `RESEARCH_OUTPUT_DIR` | `reports` | 报告保存目录 |

## 测试

以下测试不会调用 OpenAI API：

```bash
npm test
npm run check
```

## 项目定位

当前目标不是宣称已经实现完全自动、绝对可靠的研究系统，而是建立一个可以公开检查、重复测试和逐步改进的研究循环。后续计划包括引用验证、来源质量评分、语义收敛判断、总预算控制和公开评估数据。

具体计划见 [ROADMAP.md](ROADMAP.md)。

## 下游探索案例

[lian-ai](https://github.com/xxzzzzy/lian-ai) 是另一个开源实验，基于333期公开视频转写文本的结构化分析。它可以说明结构化研究方法的应用方向，但不代表当前工具已经达到生产环境标准。

## 许可证

MIT
