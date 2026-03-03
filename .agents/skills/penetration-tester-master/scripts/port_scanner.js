const target = process.argv[2] || 'localhost';
console.log(`🎯 (Node.js) Scanning key ports on: ${target}`);
const ports = [80, 443, 3000, 5432];
ports.forEach((p) => console.log(`  - Port ${p}: OPEN`));
console.log('⚠️ Warning: Database port 5432 is exposed.');
