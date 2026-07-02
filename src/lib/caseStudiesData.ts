export interface CaseStudyArticle {
  id: string;
  title: string;
  industry: string;
  location: string;
  category: string;
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  techStack: string[];
  image: string;
  excerpt: string;
  content: string;
}

export const caseStudiesData: CaseStudyArticle[] = [
  {
    id: "health-transformation",
    title: "Healthcare Cloud Transformation & Compliance",
    industry: "Healthcare",
    location: "New York",
    category: "Cloud",
    challenge: "Siloed patient data limited telehealth scaling and posed HIPAA compliance risks.",
    solution: "Architected a secure, unified AWS data lake with zero-trust networking.",
    metrics: [
      { value: "100%", label: "HIPAA Compliant" },
      { value: "3x", label: "Faster Access" },
      { value: "Zero", label: "Data Breaches" }
    ],
    techStack: ["AWS", "Python", "Cybersecurity", "Docker"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover how we built a zero-trust AWS data lake for unified patient records, ensuring absolute HIPAA compliance and sub-second query access.",
    content: `## Project Context & Challenge

Telehealth applications require instant access to centralized medical histories, but siloed databases prevented real-time processing and increased vulnerability. Medical records were split across multiple on-premises hospital servers, leading to query delays of up to 45 seconds during patient consults. Furthermore, the lack of centralized data access control posed severe HIPAA compliance risks and limited the organization's ability to roll out scalable telemedicine services.

To address this, the enterprise required a secure, centralized cloud storage repository that could unify millions of patient records while maintaining strict security controls and regulatory compliance.

## Technical Solution Architecture

We migrated the decentralized database schemas to a unified AWS S3 data lake, using AWS Glue for serverless cataloging and integration. The solution utilizes Amazon Athena for serverless SQL querying, allowing telemedicine applications to fetch patient files in milliseconds.

To secure this pipeline, Kinesis Firehose streams were configured to feed patient logs into an auditing system, creating immutable trail records of all data accesses. Encryption-at-rest is enforced using custom customer-managed KMS keys, and data-in-transit is secured using TLS 1.3 throughout all application layers.

## Zero-Trust Access Protocol

With medical data, access parameters must be strictly managed. We implemented a Zero-Trust Network Architecture (ZTNA) utilizing AWS IAM boundary policies and network segmentation.

 tele-clinicians are authenticated via OAuth 2.0 with OIDC federated groups. API requests are dynamically inspected based on clinician location, device health, and active patient-consultation schedules. Microservices are isolated using Amazon VPC security boundaries and AWS PrivateLink, preventing any public endpoints from exposing database structures.

## Compliance and Audit Success

Following a comprehensive external security review, the cloud environment achieved 100% HIPAA compliance. telemetry querying latency dropped by 93%, with doctors accessing histories in less than 3 seconds. Since deployment, the cloud architecture has sustained zero data breaches, supporting a secure expansion of the telehealth user base to over 50,000 daily active patients.`
  },
  {
    id: "finance-modernization",
    title: "Global Banking Platform Modernization",
    industry: "Financial Services",
    location: "London",
    category: "Infrastructure",
    challenge: "High maintenance costs and peak-hour downtime from legacy monolithic systems.",
    solution: "Migrated core services to AWS using a Kubernetes microservices architecture.",
    metrics: [
      { value: "99.99%", label: "Availability" },
      { value: "65%", label: "Deployment Acceleration" },
      { value: "Millions", label: "Transactions" }
    ],
    techStack: ["AWS", "Kubernetes", "Docker", "Java"],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Re-platforming legacy core banking workloads into AWS using Kubernetes, accelerating deployments and cutting annual infrastructure costs.",
    content: `## Core System Legacy Pitfalls

The client, a leading multinational retail bank, struggled with high maintenance fees, sluggish system responses, and operational failures during high-volume salary processing days. The legacy monolithic mainframe architecture made deploying software updates a high-risk event, often requiring full-system downtime and hours of manual verification. 

To remain competitive and lower operations costs, the bank needed to refactor its transaction processing systems into modern, resilient, and auto-scalable infrastructure.

## Microservices Decomposition Strategy

We collaborated with the bank's core engineering team to decompose the legacy monolithic application into modular microservices written in Java and Go. Each service (e.g. Ledgers, Transfers, Accounts, and Cards) is containerized using Docker and orchestrated via Amazon Elastic Kubernetes Service (EKS).

Traffic routing is managed by a Service Mesh (Istio), enabling canary deployments and advanced telemetry tracking. The EKS clusters utilize horizontal pod autoscalers to handle sudden spikes in user activity dynamically.

## Database Migration & Active Sync

Transitioning core transactional data required maintaining data consistency. We migrated millions of database records to Amazon Aurora PostgreSQL, configuring active-active multi-region replication.

During the migration phase, a double-write execution pattern coupled with Kafka messaging queues synchronized records between the legacy mainframe database and the cloud database in real-time, ensuring zero data loss and a risk-free switchover.

## Infrastructure Automation and GitOps

To achieve the client's deployment speed goals, we modeled the entire infrastructure using HashiCorp Terraform. Continuous integration and delivery are automated using ArgoCD, implementing a GitOps methodology.

Engineers can now declare cluster states in Git, triggering automated rollout, validation, and rolling updates. This setup accelerated software releases by 65%, reducing deployment cycles from months to under 15 minutes, while maintaining a 99.99% platform availability guarantee.`
  },
  {
    id: "mfg-analytics",
    title: "Smart Factory IoT Analytics",
    industry: "Manufacturing",
    location: "Hyderabad",
    category: "AI",
    challenge: "Lack of machine health visibility caused unpredictable downtime and revenue loss.",
    solution: "Deployed IoT edge sensors and a predictive AI maintenance model on GCP.",
    metrics: [
      { value: "85%", label: "Predictive Accuracy" },
      { value: "-45%", label: "Downtime" },
      { value: "$2.4M", label: "Saved Annually" }
    ],
    techStack: ["GCP", "Python", "AI", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    excerpt: "Leveraging Google Cloud IoT Core and TensorFlow models to predict machine fatigue, reducing manufacturing failures and predicting downtime.",
    content: `## The Manufacturing Downtime Deficit

At the client's heavy manufacturing assembly plants, unexpected machine failures were a major operational bottleneck. When a key robotic welder or conveyor motor broke down unexpectedly, it halted the entire production line, causing significant revenue loss and supply chain delays.

The primary obstacle was a lack of real-time machine telemetry; maintenance crews could only react to failures after they happened rather than predicting mechanical fatigue.

## Edge Telemetry Deployment

We designed and deployed an IoT edge collection pipeline. Industrial sensors measuring vibration, motor temperature, and current draw were fitted to over 100 critical plant assets.

Lightweight Gateway devices running Edge software collect, filter, and preprocess raw telemetry before transmission. This local processing significantly minimized network bandwidth needs, ensuring stable data transmission even during plant network fluctuations.

## GCP Data Pipelines & Ingestion

The preprocessed data stream is ingested via Google Cloud Pub/Sub at a rate of thousands of events per second. Dataflow pipelines clean, format, and enrich this telemetry, loading it concurrently into BigQuery for analytics and Cloud Bigtable for real-time dashboard visualization.

Plant operators can monitor machine metrics (vibration, heat, power draw) on live dashboards, which refresh in milliseconds.

## Predictive Maintenance Model

Utilizing historic sensor telemetry, we trained predictive machine learning models in TensorFlow. The model analyzes patterns in vibration frequencies and thermal spikes to estimate the remaining useful life (RUL) of machine components.

Deployed via Google Kubernetes Engine (GKE), the model continuously scans sensor logs, generating automatic alerts to maintenance crews 72 hours before a predicted mechanical failure. This solution decreased unscheduled downtime by 45%, saving the client $2.4M annually.`
  },
  {
    id: "logistics-automation",
    title: "Global Supply Chain Automation",
    industry: "Logistics",
    location: "Singapore",
    category: "DevOps",
    challenge: "Manual routing and disjointed APIs slowed global freight and increased delays.",
    solution: "Implemented an AI-driven routing engine and automated CI/CD deployment pipeline.",
    metrics: [
      { value: "12%", label: "Transit Time Reduced" },
      { value: "20x", label: "Faster Deployments" },
      { value: "100%", label: "API Uptime" }
    ],
    techStack: ["DevOps", "Kubernetes", "Node.js", "Azure"],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
    excerpt: "Streamlining international freight tracking with automated routing algorithms and containerized deployment networks.",
    content: `## Global Routing Bottlenecks

The client, an international logistics provider, relied on manual scheduling spreadsheets and disjointed tracking APIs to manage shipping routes and cargo transfers. This manual approach struggled to react to sudden transit delays, weather disruptions, or port congestion, leading to delayed deliveries, carrier penalties, and client dissatisfaction.

To resolve this, the logistics firm needed to build an automated, intelligent routing platform capable of recalculating paths in real-time.

## Automated Routing Engine

We developed an intelligent routing core using Node.js and Python. The engine consolidates maritime weather, traffic congestion patterns, and port throughput data via REST endpoints.

Using dynamic routing algorithms, the core computes shipping routes and estimates port arrival times. If a shipping delay is identified (e.g., weather issues), the system automatically triggers alerts and suggests optimal alternate land or sea routes to logistics coordinators.

## CI/CD Pipeline Acceleration

To deploy algorithm updates quickly, we automated the software delivery pipeline. Using GitHub Actions, Docker, and Azure Container Registry, we established a robust CI/CD workflow.

Any code commits trigger automatic unit testing, vulnerability analysis, and container build steps. Successful builds are deployed automatically onto Azure Kubernetes Service (AKS), accelerating release speeds by 20 times.

## Scalable Kubernetes Deployment

The tracking and pathfinding APIs are hosted on Azure Kubernetes Service (AKS). The clusters use internal scaling metrics (CPU, HTTP request rates) to autoscale dynamically during peak logistics windows.

Istio ingress controllers manage traffic routing and security policies, ensuring 100% API uptime. The automation of the routing engine and tracking services reduced overall cargo transit times by 12%.`
  },
  {
    id: "pharma-zero-trust",
    title: "Pharmaceutical Zero-Trust Security Migration",
    industry: "Pharmaceutical",
    location: "Dublin, Ireland",
    category: "Cybersecurity",
    challenge: "A near-miss phishing incident exposed the risk of a flat, perimeter-based security model across EU and India offices.",
    solution: "Implemented a full Zero-Trust architecture with identity-aware proxies, device trust scoring, and micro-segmented network zones.",
    metrics: [
      { value: "94%", label: "Lateral Movement Risk Reduced" },
      { value: "22min", label: "Incident Response Time" },
      { value: "SOC 2", label: "Type II Compliant" }
    ],
    techStack: ["Cybersecurity", "Zero-Trust", "Cloudflare Access", "Azure AD", "SIEM"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    excerpt: "How Jeshurun replaced a perimeter-based security model with a full Zero-Trust architecture across a leading European pharmaceutical company's global offices.",
    content: `## Context & Challenge

A leading European pharmaceutical company with Dublin headquarters and operations spanning Ireland, Germany, and India sought to overhaul its corporate security posture following a sophisticated spear-phishing campaign that came dangerously close to compromising their clinical trial data repositories.

The existing flat network allowed any authenticated user to move laterally across systems — a critical vulnerability in an industry where data integrity is not just a business concern, but a regulatory requirement under EU GMP and FDA 21 CFR Part 11.

## Zero-Trust Architecture Design

Jeshurun's security consultants conducted a 3-week discovery engagement, mapping all user access flows, application dependencies, and data classification tiers. The resulting Zero-Trust framework was built on three pillars:

**Identity Verification**: Cloudflare Access was deployed as an identity-aware reverse proxy in front of all internal applications. Every access request — whether from Dublin HQ or the India development centre — requires continuous device health attestation and MFA via Azure Active Directory Conditional Access.

**Micro-Segmentation**: The corporate network was decomposed into isolated security zones. Research and clinical systems were placed in a dedicated high-trust segment with per-session authorisation, ensuring that even a fully compromised user account could not reach sensitive datasets without triggering automated containment.

**Continuous Monitoring**: A centralised SIEM platform aggregates identity, endpoint, and network telemetry. Automated playbooks trigger isolation of any endpoint exhibiting anomalous access patterns within seconds, replacing the previous 4-hour manual investigation process.

## Outcomes

Following a 14-week phased rollout with zero production disruption, the organisation achieved SOC 2 Type II certification, passed an external penetration test with no critical findings, and reduced their simulated lateral movement attack surface by 94%. Mean incident response time dropped from 4 hours to 22 minutes.`
  },
  {
    id: "insurance-data-pipelines",
    title: "Real-Time Claims Analytics Platform",
    industry: "Insurance",
    location: "Dublin, Ireland",
    category: "Data Engineering",
    challenge: "Claims data siloed across 3 legacy systems delayed underwriting decisions by up to 24 hours, reducing competitive agility.",
    solution: "Designed a Kafka-based event streaming pipeline feeding a Snowflake data warehouse with dbt transformation layers and real-time BI dashboards.",
    metrics: [
      { value: "<3min", label: "Claims Data Latency" },
      { value: "60%", label: "Faster Underwriting" },
      { value: "€1.2M", label: "Annual Cost Savings" }
    ],
    techStack: ["Apache Kafka", "Snowflake", "dbt", "Python", "AWS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    excerpt: "Unifying claims data from 3 legacy systems into a real-time Kafka-Snowflake analytics layer, cutting underwriting decision time by 60% and saving €1.2M annually.",
    content: `## The Data Silo Problem

A mid-sized Irish insurance group serving both personal lines and commercial clients operated three separate legacy systems: a mainframe-based claims management platform, a third-party policy administration system, and a manual Excel-based bordereaux process for reinsurance reporting.

Actuaries and underwriters had no unified view of live exposure. Generating a consolidated risk report required overnight batch jobs, meaning underwriting decisions on time-sensitive commercial accounts were routinely delayed by 18–24 hours. The business estimated this lag was contributing to a 12% decline in renewal retention for mid-market commercial accounts, where speed of response is a differentiating factor.

## Event Streaming Architecture

Jeshurun's data engineering team designed a real-time event streaming architecture using Apache Kafka as the integration backbone. Change Data Capture (CDC) connectors were deployed against all three legacy systems using Debezium, translating database-level row changes into immutable event streams without requiring modifications to the source systems.

Kafka streams feed into a Snowflake data warehouse via Snowpipe for micro-batch loading, with dbt transformation models handling claims normalisation, policy joining, and reinsurance exposure calculation. The entire transformation layer is version-controlled in Git with automated testing via dbt's built-in test framework.

## Business Intelligence Layer

Real-time Power BI dashboards were connected to Snowflake's materialized views, giving underwriters live exposure summaries that refresh every 3 minutes. A dedicated bordereaux automation module generates regulatory reinsurance reports nightly, replacing the manual Excel process entirely.

## Results

Claims data latency dropped from 24 hours to under 3 minutes. Underwriting decision turnaround improved by 60% for commercial renewals. By decommissioning the legacy ETL tooling and its associated licensing and maintenance overhead, the group realised €1.2M in annual cost savings within the first 12 months of operation.`
  }
];
