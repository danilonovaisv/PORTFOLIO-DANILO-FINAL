---
description: Comprehensive testing system and test management for MAx Framework
---

# /tests - Comprehensive Testing System

Manage, run, and analyze all tests across the MAx Framework with comprehensive reporting and debugging capabilities.

## Usage

```bash
# Run all tests with comprehensive reporting
/tests

# Run specific test category
/tests --category unit
/tests --category integration
/tests --category system

# Run tests with specific focus
/tests --focus contracts
/tests --focus commands
/tests --focus quality

# Run tests with detailed output
/tests --verbose

# Run tests with auto-fix enabled
/tests --auto-fix

# Generate test report
/tests --report

# Quick test run
/tests --quick
```

## Test Categories

### 🧪 **Unit Tests**

- **Individual component testing**
- **Function and method validation**
- **Class and module testing**
- **Edge case coverage**

### 🔗 **Integration Tests**

- **Component interaction testing**
- **Cross-module functionality**
- **API integration validation**
- **Workflow testing**

### 🏗️ **System Tests**

- **End-to-end workflows**
- **Framework integration**
- **Performance validation**
- **User scenario testing**

### 📋 **Contract Tests**

- **AI contract validation**
- **Code quality standards**
- **Performance contracts**
- **Security contracts**

## Test Focus Areas

### 🎯 **Contracts Focus**

```bash
/tests --focus contracts
```

- AI contract compliance
- Code quality standards
- Performance benchmarks
- Security validations

### ⚡ **Commands Focus**

```bash
/tests --focus commands
```

- Command execution testing
- Argument parsing validation
- Error handling verification
- Integration testing

### 🔍 **Quality Focus**

```bash
/tests --focus quality
```

- Code quality metrics
- Style guide compliance
- Documentation coverage
- Best practices validation

## Test Execution Options

### 📊 **Comprehensive Mode**

```bash
/tests
```

- **All test categories**
- **Detailed reporting**
- **Performance metrics**
- **Coverage analysis**
- **Error categorization**

### ⚡ **Quick Mode**

```bash
/tests --quick
```

- **Essential tests only**
- **Minimal output**
- **Fast execution**
- **Basic reporting**

### 🔧 **Auto-Fix Mode**

```bash
/tests --auto-fix
```

- **Automatic error fixing**
- **Import resolution**
- **Syntax correction**
- **Missing method addition**

### 📋 **Report Mode**

```bash
/tests --report
```

- **Detailed test report**
- **Coverage statistics**
- **Performance analysis**
- **Trend tracking**

## Test Discovery

### 🔍 **Test File Patterns**

- `test_*.py` - Unit test files
- `*_test.py` - Alternative test naming
- `tests/**/*.py` - Test directory structure
- `**/test_*.py` - Recursive discovery

### 📁 **Test Directory Structure**

```
tests/
├── unit/                    # Unit tests
│   ├── test_commands.py
│   ├── test_quality.py
│   └── test_contracts.py
├── integration/             # Integration tests
│   ├── test_workflows.py
│   ├── test_systems.py
│   └── test_apis.py
├── system/                  # System tests
│   ├── test_end_to_end.py
│   ├── test_performance.py
│   └── test_user_scenarios.py
└── reports/                 # Test reports
    ├── coverage.json
    ├── results.json
    └── trends.json
```

## Test Results

### 📊 **Success Metrics**

```bash
✅ PASSED: 42 tests (85%)
⚠️ SKIPPED: 5 tests (10%)
❌ FAILED: 3 tests (5%)
⏱️ Duration: 2.34s
📊 Coverage: 87.3%
```

### 🚨 **Failure Analysis**

```bash
❌ FAILED TESTS:
1. test_command_execution
   - Error: AssertionError
   - Location: tests/commands/test_commands.py:42
   - Message: Expected success but got error

2. test_contract_validation
   - Error: ImportError
   - Location: tests/contracts/test_ai.py:15
   - Message: Missing required import

3. test_quality_metrics
   - Error: TimeoutError
   - Location: tests/quality/test_metrics.py:78
   - Message: Test exceeded 30s timeout
```

### 🔧 **Auto-Fix Results**

```bash
🔧 APPLIED FIXES:
1. Added missing import: import unittest
2. Fixed syntax error: print statement
3. Added missing method: setUp()
4. Corrected indentation: 4 spaces
```

## Configuration

### ⚙️ **Test Configuration**

```json
{
  "test_paths": ["tests/", "test_*.py", "*_test.py"],
  "test_categories": ["unit", "integration", "system", "contracts"],
  "timeout": 30,
  "auto_fix": true,
  "verbose": true,
  "coverage": true,
  "parallel": true
}
```

### 🎯 **Environment Variables**

```bash
# Enable auto-fix
export MAX_TESTS_AUTO_FIX=1

# Set test timeout
export MAX_TESTS_TIMEOUT=60

# Enable verbose output
export MAX_TESTS_VERBOSE=1

# Disable parallel execution
export MAX_TESTS_SEQUENTIAL=1
```

## Integration

### 🔄 **CI/CD Integration**

```yaml
# .github/workflows/tests.yml
name: Comprehensive Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run comprehensive tests
        run: /tests --report
      - name: Upload test results
        uses: actions/upload-artifact@v2
        with:
          name: test-results
          path: tests/reports/
```

### 🔧 **Pre-commit Hook**

```bash
#!/bin/sh
# .git/hooks/pre-commit
/tests --quick
if [ $? -ne 0 ]; then
    echo "❌ Tests failed - commit blocked"
    exit 1
fi
```

### 📊 **Quality Gate Integration**

```bash
# Run as part of quality gate
/max-quality --include-tests

# Fail build on test failures
/tests --strict
```

## Advanced Features

### 🎯 **Test Filtering**

```bash
# Run tests matching pattern
/tests --pattern "test_*contract*"

# Exclude specific tests
/tests --exclude "test_slow_*"

# Run tests by file
/tests --file test_commands.py

# Run tests by directory
/tests --directory tests/unit/
```

### 📈 **Performance Testing**

```bash
# Run performance benchmarks
/tests --performance

# Measure execution time
/tests --timing

# Memory usage analysis
/tests --memory
```

### 🔍 **Debug Mode**

```bash
# Run with debugger
/tests --debug

# Stop on first failure
/tests --failfast

# Run with detailed tracebacks
/tests --traceback
```

## Reports

### 📊 **Coverage Report**

```bash
/tests --coverage
```

- **Line coverage**: 87.3%
- **Branch coverage**: 82.1%
- **Function coverage**: 91.5%
- **Missing coverage**: 12.7%

### 📈 **Trend Analysis**

```bash
/tests --trends
```

- **Test count trend**: +5 tests this week
- **Success rate trend**: 92% → 95%
- **Performance trend**: -0.2s average
- **Coverage trend**: +2.3% this month

### 📋 **Detailed Report**

```bash
/tests --report --detailed
```

- **Test execution summary**
- **Failure analysis**
- **Performance metrics**
- **Coverage breakdown**
- **Recommendations**

## Benefits

### 🎯 **Comprehensive Coverage**

- **All test types**: Unit, integration, system, contracts
- **Multiple frameworks**: unittest, pytest, custom
- **Cross-platform**: Linux, macOS, Windows
- **Language support**: Python, JavaScript, Shell

### 🔧 **Intelligent Testing**

- **Auto-fix capabilities**: Common error resolution
- **Smart discovery**: Automatic test finding
- **Parallel execution**: Faster test runs
- **Caching**: Avoid redundant work

### 📊 **Detailed Insights**

- **Real-time progress**: Live test execution
- **Performance metrics**: Timing and resource usage
- **Trend analysis**: Historical test data
- **Quality metrics**: Coverage and success rates

### 🚀 **Developer Friendly**

- **Easy integration**: CI/CD, pre-commit hooks
- **Flexible configuration**: Customizable behavior
- **Rich reporting**: Multiple output formats
- **Debug support**: Detailed error information

The comprehensive testing system provides complete test coverage with intelligent automation and detailed reporting, ensuring code quality and reliability across the entire MAx Framework!
