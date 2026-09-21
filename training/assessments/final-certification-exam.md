---
title: Final Certification Assessment
module: Assessments
minutes: 60
level: Advanced
status: complete

# AI Security Threat Modeling Final Certification Assessment

Passing Score: 80%

Instructions:

- Answer all questions.
- Use the lessons, worksheets, and reference guides as needed.
- A passing score demonstrates readiness to participate in enterprise AI threat modeling reviews.

---
---

## Certification Section 1 – Foundations

> [!quiz]
> Foundations Certification
>
> 1. Threat modeling is primarily:
> - A) Security testing
> - B) Vulnerability scanning
> - C) Identifying threats before deployment
> - D) Compliance validation
> Answer: C
>
> 2. Which question comes first in Shostack's Four Questions?
> - A) What can go wrong?
> - B) What are we working on?
> - C) What will we do about it?
> - D) Did we do a good job?
> Answer: B
>
> 3. A trust boundary exists when:
> - A) Data changes format
> - B) Trust assumptions change
> - C) Logging is enabled
> - D) Models exchange prompts
> Answer: B
>
> 4. Which inventory prefix identifies components?
> - A) DF-
> - B) AI-
> - C) TB-
> - D) TM-
> Answer: B
>
> 5. Which inventory prefix identifies data flows?
> - A) AI-
> - B) TM-
> - C) DF-
> - D) TB-
> Answer: C
>
> 6. Trust boundaries are important because:
> - A) They reduce GPU cost
> - B) They improve inference speed
> - C) Most attacks occur when trust changes
> - D) They reduce token usage
> Answer: C
>
> 7. The primary goal of threat modeling is:
> - A) Eliminate all risk
> - B) Identify and reduce risk
> - C) Increase model accuracy
> - D) Increase automation
> Answer: B

---

## Certification Section 2 – Components & Trust Boundaries

> [!quiz]
> Components & Boundaries Certification
>
> 1. Which component typically collects prompts, instructions, context, and tool decisions?
> - A) Gateway
> - B) Orchestrator
> - C) Audit Service
> - D) Vector Store
> Answer: B
>
> 2. Which component converts agent intent into real-world action?
> - A) Retriever
> - B) Memory
> - C) Tool
> - D) Embedding Model
> Answer: C
>
> 3. Which trust boundary converts reasoning into execution?
> - A) Provider Boundary
> - B) Tool Boundary
> - C) Memory Boundary
> - D) Human Boundary
> Answer: B
>
> 4. Which trust boundary exists when data leaves organizational control?
> - A) Tool Boundary
> - B) Memory Boundary
> - C) Provider Boundary
> - D) Human Boundary
> Answer: C
>
> 5. Memory becomes dangerous because:
> - A) It increases storage costs
> - B) It creates persistence
> - C) It reduces accuracy
> - D) It limits retrieval
> Answer: B
>
> 6. The strongest architectural controls usually live:
> - A) Inside prompts
> - B) At trust boundaries
> - C) Inside embeddings
> - D) Inside reports
> Answer: B
>
> 7. The primary purpose of a Policy Engine is:
> - A) Store knowledge
> - B) Generate embeddings
> - C) Determine whether actions are allowed
> - D) Provide model responses
> Answer: C
## Certification Section 3 – OWASP LLM Top 10

> [!quiz]
> OWASP Certification
>
> 1. Direct prompt injection maps to:
> - A) LLM01
> - B) LLM04
> - C) LLM07
> - D) LLM10
> Answer: A
>
> 2. Sensitive Information Disclosure maps to:
> - A) LLM01
> - B) LLM02
> - C) LLM08
> - D) LLM09
> Answer: B
>
> 3. Data & Model Poisoning maps to:
> - A) LLM03
> - B) LLM04
> - C) LLM07
> - D) LLM10
> Answer: B
>
> 4. Improper Output Handling maps to:
> - A) LLM05
> - B) LLM06
> - C) LLM08
> - D) LLM10
> Answer: A
>
> 5. Excessive Agency maps to:
> - A) LLM04
> - B) LLM05
> - C) LLM06
> - D) LLM08
> Answer: C
>
> 6. System Prompt Leakage maps to:
> - A) LLM07
> - B) LLM03
> - C) LLM06
> - D) LLM01
> Answer: A
>
> 7. Unbounded Consumption primarily concerns:
> - A) Availability and cost
> - B) Identity
> - C) Memory
> - D) Governance
> Answer: A

---

## Certification Section 4 – ATLAS & Kill Chains

> [!quiz]
> ATLAS & Kill Chain Certification
>
> 1. AML.T0051 represents:
> - A) Prompt Injection
> - B) Model Extraction
> - C) Poisoning
> - D) Exfiltration
> Answer: A
>
> 2. AML.T0020 represents:
> - A) Tool Abuse
> - B) Prompt Injection
> - C) ML Artifact Poisoning
> - D) Model Theft
> Answer: C
>
> 3. AML.T0024 represents:
> - A) Model Extraction
> - B) Exfiltration via ML Inference
> - C) Goal Drift
> - D) Delegation Abuse
> Answer: B
>
> 4. Prompt Injection typically belongs to which kill-chain phase?
> - A) Reconnaissance
> - B) Execution
> - C) Recovery
> - D) Governance
> Answer: B
>
> 5. A poisoned vector database most directly represents:
> - A) Persistence
> - B) Recovery
> - C) Detection
> - D) Governance
> Answer: A
>
> 6. Which phase usually offers the best opportunity to stop an attack early?
> - A) Impact
> - B) Exfiltration
> - C) Initial Access or Persistence
> - D) Recovery
> Answer: C
>
> 7. AML.T0054 represents:
> - A) Excessive Agency
> - B) Supply Chain
> - C) Model Extraction
> - D) Retrieval
> Answer: A

---

## Certification Section 5 – STRIDE

> [!quiz]
> STRIDE Certification
>
> 1. Which STRIDE category addresses identity impersonation?
> - A) Tampering
> - B) Repudiation
> - C) Spoofing
> - D) Elevation of Privilege
> Answer: C
>
> 2. Which STRIDE category addresses unauthorized modification of data?
> - A) Tampering
> - B) Spoofing
> - C) Information Disclosure
> - D) Repudiation
> Answer: A
>
> 3. Prompt Injection frequently maps to:
> - A) Spoofing or Tampering
> - B) Repudiation
> - C) DoS only
> - D) Disclosure only
> Answer: A
>
> 4. Which STRIDE category most closely aligns with sensitive data leakage?
> - A) Information Disclosure
> - B) Tampering
> - C) Spoofing
> - D) Repudiation
> Answer: A
>
> 5. Context flooding is usually:
> - A) Spoofing
> - B) DoS
> - C) Repudiation
> - D) Tampering
> Answer: B
>
> 6. Unauthorized admin actions typically represent:
> - A) Information Disclosure
> - B) Elevation of Privilege
> - C) Repudiation
> - D) Spoofing
> Answer: B
>
> 7. Missing audit logs primarily create:
> - A) Repudiation
> - B) Tampering
> - C) Spoofing
> - D) DoS
> Answer: A

---

## Certification Section 6 – RAG Security

> [!quiz]
> RAG Certification
>
> 1. What does RAG stand for?
> - A) Retrieval-Augmented Generation
> - B) Retrieval Automation Gateway
> - C) Retrieval Agent Governance
> - D) Reinforcement Agent Generation
> Answer: A
>
> 2. RAG's signature threat is:
> - A) Model Theft
> - B) Indirect Prompt Injection
> - C) Hallucination
> - D) Goal Drift
> Answer: B
>
> 3. Index Poisoning is dangerous because:
> - A) It survives retrieval cycles
> - B) It increases latency
> - C) It removes memory
> - D) It changes model weights
> Answer: A
>
> 4. Which flow is commonly the confidentiality boundary in RAG?
> - A) User → UI
> - B) Orchestrator → LLM Provider
> - C) Retriever → Store
> - D) Memory → Agent
> Answer: B
>
> 5. Retrieved content should be treated as:
> - A) Trusted Instructions
> - B) Trusted Prompts
> - C) Untrusted Data
> - D) Verified Facts
> Answer: C
>
> 6. A malicious PDF that influences future users is:
> - A) Tool Abuse
> - B) Hallucination
> - C) Index Poisoning
> - D) Goal Drift
> Answer: C
>
> 7. The strongest control against poisoned content is:
> - A) Lower Temperature
> - B) Prompt Engineering
> - C) Ingestion Validation & Provenance
> - D) Larger Context Windows
> Answer: C

---

## Certification Section 7 – Agent Security

> [!quiz]
> Agent Security Certification
>
> 1. Which component converts reasoning into business impact?
> - A) Tool Layer
> - B) Memory
> - C) Retriever
> - D) Embedding Model
> Answer: A
>
> 2. Excessive Agency means:
> - A) Excessive permissions or autonomy
> - B) High model accuracy
> - C) Large context windows
> - D) More users
> Answer: A
>
> 3. What uniquely increases risk in Multi-Agent systems?
> - A) Bigger models
> - B) Shared State & Delegation
> - C) Faster retrieval
> - D) Additional prompts
> Answer: B
>
> 4. Agent Collusion refers to:
> - A) Backup synchronization
> - B) Multiple agents reinforcing harmful behavior
> - C) Prompt optimization
> - D) Retrieval ranking
> Answer: B
>
> 5. Goal Drift means:
> - A) Objective expansion beyond intended scope
> - B) Slower execution
> - C) Retrieval failure
> - D) Memory loss
> Answer: A
>
> 6. Which control is strongest for autonomous systems?
> - A) Prompt Templates
> - B) Boundary Detection and HITL
> - C) Larger Models
> - D) Additional Embeddings
> Answer: B
>
> 7. Which control must remain independent?
> - A) Memory
> - B) Vector Store
> - C) Kill Switch
> - D) Retriever
> Answer: C

---

## Certification Section 8 – Agent Memory Security

> [!quiz]
> Memory Security Certification
>
> 1. Memory Poisoning is primarily:
> - A) Persistence
> - B) Disclosure
> - C) Hallucination
> - D) Retrieval
> Answer: A
>
> 2. Cross-Session Leakage affects:
> - A) Throughput
> - B) Isolation
> - C) Cost
> - D) Availability
> Answer: B
>
> 3. Memory becomes dangerous because it:
> - A) Creates persistence
> - B) Reduces performance
> - C) Removes retrieval
> - D) Expands prompts
> Answer: A
>
> 4. Which flow reintroduces stored instructions?
> - A) User → Agent
> - B) Memory → Agent
> - C) Agent → Tool
> - D) Provider → Agent
> Answer: B
>
> 5. The strongest control against cross-user leakage is:
> - A) Better Prompts
> - B) Lower Temperature
> - C) Memory Isolation
> - D) Context Compression
> Answer: C
>
> 6. Stored hallucinations become:
> - A) False Fact Persistence
> - B) Model Extraction
> - C) Tool Abuse
> - D) Grounding
> Answer: A
>
> 7. Goal Manipulation occurs when:
> - A) Stored content alters future planning
> - B) Retrieval fails
> - C) Output filtering fails
> - D) Models drift
> Answer: A

---

## Certification Section 9 – MCP & Tool Ecosystem Security

> [!quiz]
> MCP Security Certification
>
> 1. A valid tool performing an unauthorized action is:
> - A) Tool Abuse
> - B) Hallucination
> - C) Model Theft
> - D) Grounding Failure
> Answer: A
>
> 2. Least Privilege primarily reduces:
> - A) Token Count
> - B) Blast Radius
> - C) Hallucinations
> - D) Latency
> Answer: B
>
> 3. Tool output should be treated as:
> - A) Trusted Instructions
> - B) Trusted Prompts
> - C) Untrusted Data
> - D) Administrative Approval
> Answer: C
>
> 4. What is Tool Impersonation?
> - A) A fake service appearing legitimate
> - B) A retrieval failure
> - C) A prompt leak
> - D) A hallucination
> Answer: A
>
> 5. Cross-Tool Chaining becomes dangerous because:
> - A) Safe actions combine into harmful workflows
> - B) It reduces throughput
> - C) It changes embeddings
> - D) It improves retrieval
> Answer: A
>
> 6. Which component evaluates whether actions are allowed?
> - A) MCP Server
> - B) Policy Engine
> - C) Vector Store
> - D) Retriever
> Answer: B
>
> 7. Which boundary creates business impact?
> - A) Memory Boundary
> - B) Tool Boundary
> - C) Human Boundary
> - D) Provider Boundary
> Answer: B

---

## Certification Section 10 – AI Red Teaming

> [!quiz]
> Red Teaming Certification
>
> 1. The primary purpose of AI Red Teaming is:
> - A) Improve Model Accuracy
> - B) Validate Controls Under Attack
> - C) Reduce Costs
> - D) Improve Retrieval
> Answer: B
>
> 2. A threat model that has never been tested is:
> - A) Verified
> - B) Production Ready
> - C) A Hypothesis
> - D) Complete
> Answer: C
>
> 3. Which attack surface is commonly overlooked?
> - A) Memory
> - B) Gateway
> - C) Browser
> - D) Logging
> Answer: A
>
> 4. Red Teaming should evaluate:
> - A) Prompts only
> - B) Models only
> - C) Retrieval, Memory, Tools, and Autonomy
> - D) Cost only
> Answer: C
>
> 5. Which metric measures defensive effectiveness?
> - A) Attack Success Rate
> - B) Detection Effectiveness
> - C) Recovery Rate
> - D) All of the Above
> Answer: D
>
> 6. Why should testing be continuous?
> - A) Controls drift and systems change
> - B) Models stop working
> - C) Retrieval expires
> - D) Context windows shrink
> Answer: A
>
> 7. The strongest evidence of security is:
> - A) Documentation
> - B) Assumptions
> - C) Validated Controls
> - D) Larger Models
> Answer: C