# ☁️ Infrastructure Security (Cloud & Container)

## 🎯 Purpose

Hardening the underlying platform (AWS, Docker, Kubernetes) to support secure applications.

## 🛡️ Hardening Checklist

### Docker / Containers

- [ ] **Non-root User**: `USER node` instead of default root.
- [ ] **Image Scan**: `trivy image my-app:latest` (detect OS vulnerabilities).
- [ ] **Secrets**: Never build `.env` into image. Use runtime injection.

### Cloud (AWS/GCP/Azure)

- [ ] **IAM**: Least Privilege. No `AdministratorAccess` for service roles.
- [ ] **Security Groups**: Allow only necessary ports (443, not 22 to public).
- [ ] **WAF**: Web Application Firewall to block common attacks.

### Kubernetes

- [ ] **Network Policies**: Restrict pod-to-pod communication.
- [ ] **RBAC**: Limit `kubectl` access based on roles.
- [ ] **Pod Security**: Disallow `privileged` containers.

## 🛠️ Tools

- **Trivy**: Container scanner.
- **Chekov**: Infrastructure as Code (IaC) scanner.
- **Falco**: Runtime threat detection.
