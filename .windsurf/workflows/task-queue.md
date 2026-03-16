---
description: Task queue system for goal-oriented development
---

# /queue - Visual Task Queue System

The task queue helps you visualize and organize work toward goals and subgoals, keeping you forward-focused.

## Queue Structure

```
📋 Max Task Queue
├── 🎯 Main Goal: [Primary Objective]
├── 📍 Current Focus: [Active Task]
├── 📅 Upcoming: [Next Tasks]
└── ✅ Completed: [Done Tasks]
```

## Queue Commands

### /queue show

Display current queue with priorities

### /queue add "Task description" [priority]

Add task to queue

- Priority: high, medium, low

### /queue next

Move to next task in queue

### /queue complete

Mark current task as complete

### /queue reorder

Reorder tasks by priority

## Queue Visualization

### ASCII Art Format

```
📋 MAX TASK QUEUE
==================

🎯 GOAL: Complete Max Persona Framework

📍 CURRENT: Add task queue system (HIGH)
   └── Status: In Progress
   └── Est: 30 min
   └── Dependencies: None

📅 QUEUE:
   1. [HIGH] Initialize git repo
   2. [MED ] Add multi-IDE support
   3. [LOW ] Create CLI tool

✅ COMPLETED:
   ✓ Fixed credit calculation
   ✓ Added /humanify command
   ✓ Created migration tools
```

## Goal Decomposition

### Main Goal → Subgoals → Tasks

```
🎯 Deploy Max Framework
   ├── 📦 Create packages
   │   ├── Model Agent Extender VS Code extension
   │   ├── CLI tool
   │   └── Web dashboard
   ├── 🔄 Migration system
   │   ├── sync-max.sh
   │   └── install-max.sh
   └── 📚 Documentation
       ├── README updates
       └── Workflow guides
```

## Forward Focus Features

### 1. **Goal Alignment**

Every task links to a higher-level goal

### 2. **Progress Tracking**

Visual progress bars for each goal

```
🎯 Model Agent Extender [████████░░] 80%
```

### 3. **Time Estimates**

Track and improve estimation accuracy

### 4. **Dependency Management**

Visualize task dependencies

```
Task A → Task B → Task C
```

## Queue Storage

### File: `.max/task-queue.json`

```json
{
  "main_goal": "Deploy Max Persona Framework",
  "current_task": {
    "id": "task-004",
    "description": "Add task queue system",
    "priority": "high",
    "status": "in_progress",
    "estimated_minutes": 30,
    "goal_id": "goal-001"
  },
  "queue": [
    {
      "id": "task-005",
      "description": "Initialize git repo",
      "priority": "high",
      "status": "pending",
      "estimated_minutes": 15,
      "goal_id": "goal-001"
    }
  ],
  "completed": [
    {
      "id": "task-001",
      "description": "Fixed credit calculation",
      "completed_at": "2025-02-20T...",
      "actual_minutes": 20
    }
  ],
  "goals": [
    {
      "id": "goal-001",
      "description": "Deploy Max Persona Framework",
      "progress": 0.8
    }
  ]
}
```

## Integration with Workflows

### /start-session

- Load current queue
- Show today's focus tasks

### /end-session

- Update task progress
- Estimate next session work

### /dropped-threads

- Add dropped items to queue
- Prioritize automatically

## Queue Analytics

### Metrics

- **Completion Rate**: Tasks completed vs added
- **Estimation Accuracy**: Estimated vs actual time
- **Goal Progress**: Overall goal completion
- **Focus Time**: Time spent on high-priority tasks

### Reports

```
📊 WEEKLY REPORT
===============
Tasks Completed: 12/15 (80%)
Avg Estimation Error: +15%
Goal Progress: +25%
Focus Time: 70% on HIGH priority
```

## Best Practices

1. **Keep queue visible** - Always show current task
2. **Limit WIP** - Max 3 concurrent tasks
3. **Timebox tasks** - Default 30 minutes
4. **Review daily** - Update priorities
5. **Celebrate completions** - Track progress

## Philosophy

The queue keeps you forward-focused by:

- Making goals visible and concrete
- Breaking large goals into doable tasks
- Providing clear next steps
- Tracking progress visually
- Preventing context switching

No more "what should I work on?" - the queue always knows.
