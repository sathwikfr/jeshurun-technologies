import React from "react";

export const AwsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "w-6 h-6"} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FF9900" d="M6.868 11.084c.162.247.332.482.528.694.475.513 1.05.908 1.703 1.17.654.262 1.344.385 2.054.364.708-.02 1.393-.186 2.023-.49.63-.306 1.18-.737 1.62-1.272.268-.325.485-.684.65-1.065h1.921c-.244.757-.614 1.46-1.096 2.083-.787.973-1.785 1.74-2.915 2.24-1.13.5-2.358.74-3.585.7-1.228-.04-2.427-.375-3.5-.98a8.03 8.03 0 0 1-2.584-2.417c-.36-.54-.647-1.13-.854-1.745h2.158c.17.25.353.493.555.727zm2.748-2.454c.27-.47.66-.86 1.14-1.13.48-.27 1.02-.4 1.56-.37.54.03 1.06.21 1.5.52.44.31.78.74.98 1.24.08.2.22.37.4.49.18.12.39.18.61.17h1.61c-.04-.55-.22-1.07-.52-1.54a5.2 5.2 0 0 0-1.47-1.6 5.24 5.2 0 0 0-2.28-.86c-.81-.13-1.63-.04-2.4.24-.77.28-1.46.74-2.02 1.34a6.3 6.3 0 0 0-1.37 2.15h2.2c.16-.25.34-.49.56-.72zM2.875 16.5c3.21 2.25 7.18 3.5 11.25 3.5 2.65 0 5.25-.56 7.625-1.63.31-.14.44-.5.3-.81a.63.63 0 0 0-.51-.35c-2.28 1.02-4.78 1.55-7.32 1.55-3.9 0-7.7-1.2-10.77-3.36a.6.6 0 0 0-.84.14.6.6 0 0 0 .27.96zm17.045-.36c.2-.38.74-1.67.57-2.04-.17-.37-1.46-.57-1.95-.57-.49 0-.61.37-.28.62.33.25 1.09.73 1.25.96.16.23.1.66.41 1.03z"/>
  </svg>
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

