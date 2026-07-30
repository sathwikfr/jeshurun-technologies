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
      <linearGradient id="ai-grad-1" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <linearGradient id="ai-grad-2" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="url(#ai-grad-1)"/>
    <path d="M12 2L14.4 9.6L22 12L12 12L12 2Z" fill="url(#ai-grad-2)" opacity="0.6"/>
    <path d="M12 22L9.6 14.4L2 12L12 12L12 22Z" fill="url(#ai-grad-2)" opacity="0.6"/>
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
      <linearGradient id="sec-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#0D9488" />
      </linearGradient>
      <linearGradient id="sec-hi" x1="12" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Shield background */}
    <path d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z" fill="url(#sec-grad)"/>
    {/* Highlight / Facet */}
    <path d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23V2Z" fill="url(#sec-hi)"/>
    
    {/* Simplified Lock */}
    <rect x="9" y="12" width="6" height="5" rx="1" fill="white" />
    <path d="M9.5 12V10C9.5 8.61929 10.6193 7.5 12 7.5C13.3807 7.5 14.5 8.61929 14.5 10V12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
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
      <linearGradient id="comp-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>
    </defs>
    
    {/* Bold 12-point Rosette Seal */}
    <path d="M12 1L14.7 3.6L18.4 3.1L19.7 6.6L23.1 7.9L21.9 11.5L23.9 14.5L21 16.8L21 20.5L17.4 21.2L15 24L12 22L9 24L6.6 21.2L3 20.5L3 16.8L0.1 14.5L2.1 11.5L0.9 7.9L4.3 6.6L5.6 3.1L9.3 3.6L12 1Z" fill="url(#comp-grad)"/>
    
    {/* Inner detail */}
    <circle cx="12" cy="12.5" r="6" fill="white" opacity="0.15"/>
    <path d="M8.5 13L11 15.5L16 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
