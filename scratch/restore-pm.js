const fs = require('fs');
const { execSync } = require('child_process');

try {
  // Get original file content from HEAD
  const originalContent = execSync('git show HEAD:src/components/AnimatedServiceVisual.tsx', { encoding: 'utf8' });
  
  // Extract original ProjectManagementVisual
  const pmStart = originalContent.indexOf('/* ==========================================================================\n PROJECT MANAGEMENT VISUAL (Agile / Flow)');
  if (pmStart === -1) throw new Error("Could not find start of original ProjectManagementVisual");
  
  const originalPMComponent = originalContent.substring(pmStart);

  // Get current file content
  const filePath = 'src/components/AnimatedServiceVisual.tsx';
  const currentContent = fs.readFileSync(filePath, 'utf8');
  
  // Find where the current ProjectManagementVisual starts
  const currentPmStart = currentContent.indexOf('function ProjectManagementVisual() {');
  if (currentPmStart === -1) throw new Error("Could not find current ProjectManagementVisual");
  
  // Replace it
  const newContent = currentContent.substring(0, currentPmStart) + originalPMComponent;
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log("Successfully reverted ProjectManagementVisual to original!");
} catch (e) {
  console.error("Error:", e.message);
}
