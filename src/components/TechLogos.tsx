import React from "react";

export const AwsLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" className={className} alt="AWS" />
);

export const AzureLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" className={className} alt="Azure" />
);

export const GcpLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" className={className} alt="GCP" />
);

export const ReactLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" className={className} alt="React" />
);

export const NextJsLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" className={`${className || ""} dark:invert`} alt="Next.js" />
);

export const NodeJsLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" className={className} alt="Node.js" />
);

export const DockerLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" className={className} alt="Docker" />
);

export const KubernetesLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" className={className} alt="Kubernetes" />
);

export const PythonLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className={className} alt="Python" />
);

export const TerraformLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" className={className} alt="Terraform" />
);

export const GithubActionsLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" className={className} alt="GitHub Actions" />
);

export const KafkaLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" className={className} alt="Kafka" />
);

export const PostgresLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" className={className} alt="PostgreSQL" />
);

export const SnowflakeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" stroke="#29B5E8" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M12 5.5L9.5 3.5M12 5.5L14.5 3.5M12 18.5L9.5 20.5M12 18.5L14.5 20.5M5.5 12L3.5 9.5M5.5 12L3.5 14.5M18.5 12L20.5 9.5M18.5 12L20.5 14.5" stroke="#29B5E8" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const MongoDbLogo = ({ className }: { className?: string }) => (
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" className={className} alt="MongoDB" />
);

/**
 * AI Icon — abstract neural-node network mark
 * 4 nodes connected by weighted lines, gradient fill (indigo → violet)
 * Reads clearly at 24px, distinct from "brain" cliché
 */
export const AiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "w-6 h-6"} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ai-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <linearGradient id="ai-node" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    {/* Connection lines — lighter weight, gradient stroke */}
    <line x1="6" y1="6" x2="12" y2="12" stroke="url(#ai-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="18" y1="6" x2="12" y2="12" stroke="url(#ai-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="6" y1="18" x2="12" y2="12" stroke="url(#ai-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="18" y1="18" x2="12" y2="12" stroke="url(#ai-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="6" y1="6" x2="18" y2="6" stroke="url(#ai-grad)" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    <line x1="6" y1="18" x2="18" y2="18" stroke="url(#ai-grad)" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    {/* Outer nodes — hollow rings */}
    <circle cx="6" cy="6" r="2.2" fill="#EEF2FF" stroke="url(#ai-grad)" strokeWidth="1.4" />
    <circle cx="18" cy="6" r="2.2" fill="#EEF2FF" stroke="url(#ai-grad)" strokeWidth="1.4" />
    <circle cx="6" cy="18" r="2.2" fill="#EEF2FF" stroke="url(#ai-grad)" strokeWidth="1.4" />
    <circle cx="18" cy="18" r="2.2" fill="#EEF2FF" stroke="url(#ai-grad)" strokeWidth="1.4" />
    {/* Center hub — solid, larger, accent fill */}
    <circle cx="12" cy="12" r="3" fill="url(#ai-grad)" />
    <circle cx="12" cy="12" r="1.4" fill="white" opacity="0.8" />
  </svg>
);

/**
 * Cybersecurity Icon — shield with integrated lock keyhole
 * Two-tone teal gradient on shield body, contrasting lock detail
 * More sophisticated than flat shield-check
 */
export const CybersecurityLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "w-6 h-6"} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sec-grad" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2DD4BF" />
        <stop offset="100%" stopColor="#0D9488" />
      </linearGradient>
      <linearGradient id="sec-hi" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Shield body */}
    <path
      d="M12 2L4 5.5V11c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V5.5L12 2z"
      fill="url(#sec-grad)"
    />
    {/* Highlight edge on left of shield for depth */}
    <path
      d="M12 2L4 5.5V11c0 4.5 3.4 8.7 8 9.9V2z"
      fill="url(#sec-hi)"
    />
    {/* Lock body */}
    <rect x="9.5" y="12" width="5" height="4" rx="0.8" fill="white" opacity="0.95" />
    {/* Lock shackle */}
    <path d="M10.2 12V10.5a1.8 1.8 0 013.6 0V12" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.95" />
    {/* Keyhole */}
    <circle cx="12" cy="13.8" r="0.8" fill="#0D9488" />
    <rect x="11.65" y="14.2" width="0.7" height="1" rx="0.2" fill="#0D9488" />
  </svg>
);

/**
 * Compliance Icon — certification seal / official stamp
 * Circular outer ring + inner star-burst + central check-shield mark
 * Rose/coral gradient — distinct from blue/teal/indigo used by AI & Cybersecurity
 */
export const ComplianceLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "w-6 h-6"} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="comp-grad" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>
    </defs>
    {/* Outer seal ring — dashed/segmented to evoke a stamp */}
    <circle cx="12" cy="12" r="10.2" stroke="url(#comp-grad)" strokeWidth="1.2" strokeDasharray="2.8 1.6" strokeLinecap="round" />
    {/* Inner filled circle — base of seal */}
    <circle cx="12" cy="12" r="7.5" fill="url(#comp-grad)" />
    {/* Star-burst rays — 8 short lines emanating from center */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 12 + Math.cos(rad) * 4.2;
      const y1 = 12 + Math.sin(rad) * 4.2;
      const x2 = 12 + Math.cos(rad) * 6.2;
      const y2 = 12 + Math.sin(rad) * 6.2;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />;
    })}
    {/* Central checkmark on document */}
    <path d="M9.5 12.2l1.8 1.8 3.4-3.4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
