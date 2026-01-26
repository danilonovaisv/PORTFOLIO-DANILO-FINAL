#!/bin/bash

# Portfolio Danilo Novais - Setup Script
# Installs specific dependencies and checks environment consistency based on the Official Tech Stack.

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() { echo -e "\n${YELLOW}=== $1 ===${NC}"; }
print_success() { echo -e "${GREEN}$1${NC}"; }
print_error() { echo -e "${RED}$1${NC}"; }
print_info() { echo -e "${BLUE}$1${NC}"; }

print_header "PORTFOLIO SETUP & DEPENDENCY CHECK"

# 1. Project Structure Check
print_info "Checking project structure..."
REQUIRED_DIRS=("src" "public")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [[ ! -d "$dir" ]]; then
        print_info "Creating missing directory: $dir"
        mkdir -p "$dir"
    fi
done

# 2. Tech Stack Installation
print_header "INSTALLING OFFICIAL TECH STACK"

print_info "Installing Core Dependencies (Next.js, React, TypeScript)..."
pnpm install next@latest react@latest react-dom@latest
pnpm install -D typescript @types/node @types/react @types/react-dom

print_info "Installing Styling Stack (Tailwind, PostCSS, Utils)..."
pnpm install -D tailwindcss postcss autoprefixer
pnpm install clsx tailwind-merge

print_info "Installing Graphics & Animation (R3F, Motion, GSAP, Lenis)..."
pnpm install three @react-three/fiber @react-three/drei @react-three/postprocessing
pnpm install framer-motion gsap lenis

print_info "Installing State Management (Zustand)..."
pnpm install zustand

# 3. Configuration Files Initialization
print_header "CHECKING CONFIGURATION FILES"

if [[ ! -f "tailwind.config.ts" && ! -f "tailwind.config.js" ]]; then
    print_info "Initializing Tailwind configuration..."
    pnpm dlx tailwindcss init -p --ts
else
    print_success "Tailwind config exists."
fi

# 4. Final Verification
print_header "VERIFICATION"

if grep -q "three" package.json; then
    print_success "Dependency 'three' found."
else
    print_error "Dependency 'three' MISSING."
fi

if grep -q "zustand" package.json; then
    print_success "Dependency 'zustand' found."
else
    print_error "Dependency 'zustand' MISSING."
fi

print_header "SETUP COMPLETE"
echo -e "Ready to start development. Run: ${GREEN}pnpm run dev${NC}"