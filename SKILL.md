---
name: deep-research
description: "Use when user wants to conduct deep, iterative research on a topic. Triggers autonomous research loops with continuous improvement until optimal results. Keywords: 研究, research, 深度研究, 调研, analyze, investigate, 分析一下, 查一下, 深度调研"
---

# Deep Research Skill

自动深度研究工具 - 持续循环搜索、分析、验证，直到获得最优结果。

## 核心原理（基于 AutoResearch）

1. **明确指标** - 定义研究成功标准
2. **限定范围** - 聚焦特定问题，避免发散
3. **快速验证** - 多源交叉验证信息
4. **迭代改进** - 基于发现持续深入
5. **记忆沉淀** - 自动保存研究过程和结论

## 触发方式

用户说以下任意指令时触发：
- "研究一下这个"
- "深度研究 XXX"
- "帮我调研一下"
- "分析一下这个话题"
- "查一下相关资料"

## 工作流程

### 第一阶段：初始化
```
1. 理解研究目标
2. 定义成功标准（需要回答什么问题？）
3. 设定迭代次数上限（默认 100 轮）
4. 创建研究记录文件
```

### 第二阶段：循环研究
```
for i in range(max_iterations):
    1. 搜索相关信息
    2. 提取关键发现
    3. 分析信息质量
    4. 识别知识缺口
    5. 如果满足成功标准 → 退出循环
    6. 否则 → 基于缺口继续搜索
```

### 第三阶段：整合输出
```
1. 综合所有发现
2. 结构化整理
3. 生成最终报告
4. 保存到 memory/research/{topic}-{date}.md
```