---
description: Comprehensive test command with auto-fix and detailed debugging
---

# /test - Comprehensive Test Runner

Run all tests in all test suites with comprehensive error fixing and detailed debugging output.

## Usage

```bash
# Run all tests with auto-fix and verbose output
/test

# Run all tests without auto-fix
/test --no-auto-fix

# Run specific test file
/test --file test_example.py

# Run with extra verbosity
/test --verbose

# Quick test (no auto-fix, minimal output)
/test --quick
```

## Features

### 🧪 Comprehensive Test Discovery

- **All test patterns**: `test_*.py`, `*_test.py`, `tests/**/*.py`
- **Recursive discovery**: Finds tests in all subdirectories
- **Multiple frameworks**: unittest, pytest, and custom test runners
- **Smart filtering**: Excludes hidden and non-test files

### 🔧 Automatic Error Fixing

- **Missing imports**: Automatically adds required imports
- **Undefined variables**: Fixes common variable issues
- **Syntax errors**: Corrects common syntax problems
- **Missing test methods**: Adds basic test methods when needed

### 📊 Detailed Debugging Output

- **Verbose logging**: Step-by-step test execution
- **Full tracebacks**: Complete error stack traces
- **Stdout/Stderr capture**: All test output captured and displayed
- **Performance metrics**: Test execution timing and duration

### 📋 Comprehensive Reporting

- **Real-time progress**: Live test execution updates
- **Success rates**: Pass/fail statistics and percentages
- **Error categorization**: Grouped by error type and severity
- **Fix tracking**: Records all automatic fixes applied

## Test Execution Flow

### 1. Discovery Phase

```bash
📋 Found 15 test files:
   - tests/test_commands.py
   - test_example_feature.py
   - test_quality_standards.py
   - tests/integration/test_api.py
   - ...
```

### 2. Individual Test Execution

```bash
🔍 Testing: test_example_feature.py
  📝 Running: test_example_feature.py
    ✅ PASSED: test_example_feature.py

🔍 Testing: test_quality_standards.py
  📝 Running: test_quality_standards.py
    ❌ FAILED: test_quality_standards.py
    📋 Error Details:
       File: test_quality_standards.py
       Return Code: 1
       STDOUT:
         Running quality standards check...
       STDERR:
         ImportError: No module named 'quality_checker'
       TRACEBACK:
         Traceback (most recent call last):
           File "test_quality_standards.py", line 5, in <module>
             from quality_checker import check_standards
```

### 3. Pytest Suite Execution

```bash
🚀 Running comprehensive test suite...
  📝 Command: python -m pytest -v --tb=long --durations=10 --capture=no --color=yes
  ============================= test session starts ==============================
  collected 25 items

  test_example_feature.py::test_calculation PASSED                [  4%]
  test_commands.py::test_command_execution FAILED                  [  8%]
  test_quality_standards.py::test_standards_check FAILED          [ 12%]
  ...
```

### 4. Auto-Fix Phase

```bash
🔧 Applying auto-fixes...
  🔧 Analyzing: test_quality_standards.py
    ✅ Applied 2 fixes to test_quality_standards.py
       • Added import: import sys
       • Added import: from pathlib import Path
  📊 Total fixes applied: 2
```

### 5. Final Report

```bash
📊 COMPREHENSIVE TEST REPORT
============================================================
📅 Started: 2026-02-20 08:25:15
📅 Ended: 2026-02-20 08:25:32
⏱️  Duration: 17.23 seconds

📋 Test Summary:
   Total Tests: 25
   ✅ Passed: 18
   ❌ Failed: 7
   📊 Success Rate: 72.0%
   🔧 Fixes Applied: 2

🚨 Failed Tests Details:
   1. test_commands.py
      Error: ASSERTION_ERROR
      Message: Expected 'success' but got 'error'
   2. test_quality_standards.py
      Error: IMPORT_ERROR
      Message: No module named 'quality_checker'

🔧 Applied Fixes:
   1. Added import: import sys
   2. Added import: from pathlib import Path

📄 Detailed report saved to: .max/test_report.json

❌ TESTS FAILED - 7 failures
```

## Auto-Fix Capabilities

### 📦 Import Fixes

- **Missing unittest**: Adds `import unittest`
- **Missing pytest**: Adds `import pytest`
- **Missing pathlib**: Adds `from pathlib import Path`
- **Missing sys**: Adds `import sys`

### 🔧 Variable Fixes

- **Missing setUp**: Adds `setUp(self)` method to test classes
- **Undefined self**: Fixes common `self.` reference issues
- **Missing fixtures**: Adds basic pytest fixtures

### ⚡ Syntax Fixes

- **Print statements**: Converts `print "text"` to `print("text")`
- **Function definitions**: Adds missing colons
- **Indentation**: Fixes basic indentation issues

### 🧪 Test Method Fixes

- **Missing test methods**: Adds basic `test_example(self)` method
- **Empty test classes**: Adds test methods to empty test classes
- **Missing assertions**: Adds basic assertion to empty test methods

## Debugging Features

### 📊 Verbose Output

```bash
/test --verbose
```

- **Step-by-step execution**: Shows each test file being processed
- **Detailed error information**: Full stdout, stderr, and tracebacks
- **Fix tracking**: Shows each automatic fix being applied
- **Performance timing**: Shows execution time for each test

### 🔍 Error Analysis

- **Error categorization**: Groups errors by type (Import, Syntax, Assertion, etc.)
- **Root cause analysis**: Identifies common patterns in failures
- **Fix suggestions**: Provides specific fix recommendations
- **Impact assessment**: Shows how fixes affect test results

### 📈 Performance Metrics

- **Test timing**: Shows slowest tests with execution times
- **Success rates**: Tracks pass/fail rates over time
- **Fix effectiveness**: Measures success of auto-fix attempts
- **Coverage analysis**: Identifies untested code areas

## Integration

### 🔄 CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Comprehensive Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run comprehensive tests
        run: python .max/scripts/comprehensive_test_runner.py
```

### 🔧 Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit
python .max/scripts/comprehensive_test_runner.py --quick
if [ $? -ne 0 ]; then
    echo "❌ Tests failed - commit blocked"
    exit 1
fi
```

### 📊 Quality Gate Integration

```bash
# Run as part of quality gate
/max-quality --include-tests

# Fail build on test failures
/test --strict
```

## Configuration

### 📋 Test Configuration

The test runner can be configured via command-line arguments:

- **--verbose**: Enable detailed output (default: True)
- **--no-auto-fix**: Disable automatic error fixing
- **--file**: Run specific test file
- **--quick**: Quick test mode (minimal output, no fixes)

### 🔧 Auto-Fix Settings

Auto-fix can be controlled via environment variables:

```bash
# Disable auto-fix
export MAX_TEST_NO_AUTO_FIX=1
/test

# Enable aggressive fixing
export MAX_TEST_AGGRESSIVE_FIX=1
/test
```

## Benefits

### 🎯 Comprehensive Coverage

- **All test files**: Discovers and runs every test
- **Multiple frameworks**: Supports unittest, pytest, and custom runners
- **Recursive discovery**: Finds tests in all directories
- **Smart filtering**: Excludes non-test files automatically

### 🔧 Intelligent Fixing

- **Common errors**: Fixes most frequent test issues
- **Safe operations**: Only applies proven fixes
- **Rollback capability**: Tracks all changes for easy rollback
- **Fix validation**: Re-runs tests to verify fixes

### 📊 Detailed Insights

- **Real-time feedback**: Live progress and results
- **Error analysis**: Deep dive into failure causes
- **Performance metrics**: Identify slow tests and bottlenecks
- **Trend tracking**: Monitor test health over time

The comprehensive test runner provides complete test coverage with intelligent error fixing and detailed debugging, ensuring reliable test execution and rapid issue resolution!
