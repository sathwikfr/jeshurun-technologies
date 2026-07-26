import React from "react";

export const AwsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 110 50" className={className || "w-6 h-6"} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* a */}
    <path className="fill-slate-900 dark:fill-white" d="M12.9 23.3c0-2.2 1.5-4 4.1-4.7 2.4-.7 5.7-.7 9-.7v-2.3c0-1.8-.5-3.3-1.8-4.1-1.3-.8-3.2-1.1-5.6-1.1-3 0-5.7.7-7.9 2.4L8.4 8.7C11.9 6.2 16.3 5 21.3 5c4.7 0 8.3 1.2 10.7 3.3 2.4 2.1 3.6 5.3 3.6 9.4v17.5h-7v-3.2c-2.4 2.5-5.9 3.8-9.9 3.8-3.7 0-6.7-.9-8.7-2.9-2-1.9-3.1-4.4-3.1-7.6zm13.1 3.5c2.3 0 4.2-.6 5.7-1.8 1.5-1.2 2.3-2.9 2.3-5.2v-2.5c-1.8-.7-4.1-1-6.2-1-2.2 0-3.8.3-4.8 1-.9.7-1.5 1.7-1.5 3.1 0 1.3.5 2.3 1.4 3 1 .7 2.1 1.4 3.1 1.4z"/>
    {/* w */}
    <path className="fill-slate-900 dark:fill-white" d="M44 4.7h7.6l5.1 20.3 5.3-20.3h7l5.3 20.3 5.1-20.3h7.6L80 35.3h-7.2l-5.3-19.8L62.2 35.3H55L44 4.7z"/>
    {/* s */}
    <path className="fill-slate-900 dark:fill-white" d="M91.4 26.7c2 1.2 4.5 1.8 7.2 1.8 2.5 0 4.2-.6 5.3-1.4 1.1-.8 1.7-2 1.7-3.3 0-1.2-.6-2.3-1.7-2.8-1.1-.5-3.1-1.3-6.1-2.2-3.8-1.2-6.6-2.5-8.3-3.9-1.7-1.4-2.5-3.6-2.5-6.4 0-3.1 1.4-5.6 3.9-7.2 2.5-1.7 5.8-2.5 10.1-2.5 3.9 0 7.5.8 10.3 2.7l-2.8 4.5c-2.3-1.4-4.7-2.3-7.5-2.3-2.3 0-3.9.5-5 1.3-1.1.8-1.7 1.9-1.7 3.1 0 1.1.6 2 1.4 2.5.8.5 2.7 1.2 5.8 2.2 4.2 1.2 7 2.5 8.7 4.1 1.7 1.6 2.5 3.8 2.5 6.6 0 3.3-1.4 5.8-3.9 7.5-2.7 1.7-6.4 2.5-10.8 2.5-4.5 0-8.7-1.1-12-3.1l2.8-4.7z"/>
    {/* Smile arrow */}
    <path fill="#FF9900" d="M19.4 41.5c19.8 8 41.5 7.6 59.8-.7 1.1-.5 2.1.4 1.6 1.4-2.7 5.1-23.7 14.1-47.5 5.6-1.1-.4-2.2-1.3-1.1-2.4.4-.6 1.2-1.3 1.8-1.9z"/>
    <path fill="#FF9900" d="M78.6 39.5c-.7-.7-3.7-.3-5 0-.5.2-.5-.3 0-.5 2.4-1.3 6.2-1 6.9-.2.6.6.2 4.5-1.1 6.7-.3.5-.6.3-.5-.2.5-1.4.5-4.3-.3-5.8z"/>
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

