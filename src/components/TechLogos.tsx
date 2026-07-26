import React from "react";

export const AwsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="20 42 108 58" className={className || "w-6 h-6"} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* AWS Text */}
    <path 
      className="fill-slate-900 dark:fill-white" 
      d="M37.3 64.9c0-1.7 1-3.2 2.8-3.9 1.9-.7 4.3-1 7.2-1 3.1 0 5.6.5 7.4 1.2v-4.1c0-1.7-.5-2.9-1.7-3.7-1.2-.7-2.9-1-5.1-1-2.9 0-5.6.7-7.8 2.4l-2.2-3.7c3-2.2 6.6-3.2 10.7-3.2 4.1 0 7.3 1 9.5 2.7 2.2 1.7 3.2 4.4 3.2 8.1v17.1h-6.1v-2.7c-2.2 2.2-5.1 3.2-8.8 3.2-3.2 0-5.8-.7-7.6-2.4-1.7-1.7-2.7-3.7-2.7-6.4zm14.9 3.4c2 0 3.7-.5 5.1-1.7 1.4-1.2 2.2-2.9 2.2-5.1v-2c-1.5-.7-3.4-1.2-5.6-1.2-2 0-3.4.2-4.4 1-.9.7-1.5 1.7-1.5 3.2 0 1.2.5 2.2 1.2 2.7 1 .7 2 1.1 3 1.1zM66.6 49.7h6.6l4.4 17.8 4.6-17.8h6.1l4.6 17.8 4.4-17.8h6.6L106.3 77h-6.3l-4.6-17.3-4.6 17.3h-6.3L66.6 49.7zm41.5 19.3c1.7 1 3.9 1.5 6.3 1.5 2.2 0 3.7-.5 4.6-1.2 1-.7 1.5-1.7 1.5-2.9 0-1-.5-2-1.5-2.4-1-.5-2.7-1.2-5.4-2-3.4-1-5.8-2.2-7.3-3.4-1.5-1.2-2.2-3.2-2.2-5.6 0-2.7 1.2-4.9 3.4-6.3 2.2-1.5 5.1-2.2 8.8-2.2 3.4 0 6.6.7 9 2.4l-2.4 3.9c-2-1.2-4.1-2-6.6-2-2 0-3.4.5-4.4 1.2-1 .7-1.5 1.7-1.5 2.7 0 1 .5 1.7 1.2 2.2.7.5 2.4 1 5.1 1.9 3.7 1 6.1 2.2 7.6 3.7 1.5 1.5 2.2 3.4 2.2 5.8 0 2.9-1.2 5.1-3.4 6.6-2.4 1.5-5.6 2.2-9.5 2.2-3.9 0-7.6-1-10.5-2.7l2.4-4.2z"
    />
    {/* AWS Orange Smile Arrow */}
    <path 
      fill="#FF9900" 
      d="M23.9 91.3c17.8 9.5 41.2 9.5 60.2.2 1-.5 2.2.2 1.7 1.2-2.4 3.4-21.5 13.2-46.3 5.4-1-.2-2-1.2-1-2.2.2-.5 1-1.2 1.4-1.7l14-2.9z"
    />
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

