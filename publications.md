# Projects

## 2026
 
<div class="publication-card">
    <div class="publication-image">
        <img src="assets/Cross-Border%20Data%20Security%20and%20Privacy%20Risks%20in%20Large%20Language%20Models%20and%20IoT%20Systems.png" alt="Cross-Border Data Security and Privacy Risks in Large Language Models and IoT Systems - arXiv preprint">
    </div>
    <div class="publication-content">
        <h3 class="publication-title">
            <a href="https://arxiv.org/abs/2601.06612" class="publication-link">
                Cross-Border Data Security and Privacy Risks in LLMs & IoT Systems
            </a>
        </h3>
        <div class="publication-venue">arXiv preprint (cs.CR, cs.LG) · NYU Tandon CS-GY 6813</div>
        <div class="publication-year">2026</div>
        <div class="publication-description">
            Published research (<strong>arXiv:2601.06612</strong>) tackling <strong>cross-border data privacy risks</strong> in <strong>LLMs and IoT systems</strong> under conflicting regimes (<strong>EU GDPR</strong> vs. <strong>China PIPL</strong>). Designed a <strong>Jurisdiction-Aware, Privacy-by-Design</strong> architecture combining <strong>localized encryption</strong>, <strong>differential privacy</strong>, and <strong>zero-knowledge cryptographic proofs</strong> for real-time compliance.
            <br><br>
            <strong>Outcome:</strong> Cut unauthorized data exposure to <strong>&lt;5%</strong>, achieved <strong>zero compliance violations</strong>, and retained <strong>90%+ model utility</strong> in multi-jurisdictional simulation.
        </div>
        <div class="publication-tags">
            <span class="tag tag-safety">AI Security</span>
            <span class="tag tag-safety">LLM Security</span>
            <span class="tag tag-safety">IoT Privacy</span>
            <span class="tag tag-interpretability">GDPR & PIPL</span>
            <span class="tag tag-interpretability">Differential Privacy</span>
            <span class="tag tag-interpretability">Zero-Knowledge Proofs</span>
            <a href="https://arxiv.org/abs/2601.06612" class="tag tag-github">arXiv</a>
        </div>
    </div>
</div>

## 2025

<div class="publication-card">
    <div class="publication-image">
        <img src="assets/n8n-workflow.png" alt="SOC Automation Project">
    </div>
    <div class="publication-content">
        <h3 class="publication-title">
            <a href="https://github.com/chalithah/SOC-Automation-Lab" class="publication-link">
                End-to-End SOC Automation Project
            </a>
        </h3>
        <div class="publication-venue">SOAR · SIEM · AI Engineering</div>
        <div class="publication-year">2025</div>
        <div class="publication-description">
            Fully automated, end-to-end SOC pipeline showcasing proficiency in SOAR (n8n), SIEM (Splunk), and AI Engineering. The workflow automates alert detection, enrichment (VirusTotal/AbuseIPDB), LLM triage (OpenAI/Claude MCP), and creates persistent case management tickets in DFIR-IRIS to drastically reduce MTTR.
        </div>
        <div class="publication-tags">
            <span class="tag tag-safety">Cybersecurity</span>
            <span class="tag tag-interpretability">SIEM & SOAR</span>
            <a href="https://github.com/chalithah/SOC-Automation-Lab" class="tag tag-github">GITHUB</a>
        </div>
    </div>
</div>

<div class="publication-card">
    <div class="publication-image">
        <img src="assets/detection-lab-network.png" alt="Detection Engineering Lab">
    </div>
    <div class="publication-content">
        <h3 class="publication-title">
            <a href="https://github.com/chalithah/detection-engineering-lab" class="publication-link">
                Enterprise Detection & Adversary Emulation Lab
            </a>
        </h3>
        <div class="publication-venue">Splunk · Zeek · Suricata · MITRE ATT&CK</div>
        <div class="publication-year">2025</div>
        <div class="publication-description">
            Built a complete SOC infrastructure to simulate and detect real-world adversary tradecraft. I engineered a segmented network with Active Directory and pfSense, then executed attacks (C2 Beaconing, Persistence, Recon) mapped to the MITRE ATT&CK framework.
Outcome: Developed high-fidelity Splunk detections by correlating Sysmon endpoint telemetry with Zeek/Suricata network data, proving the ability to detect threats that bypass standard logging.
        </div>
        <div class="publication-tags">
            <span class="tag tag-safety">Detection Engineering</span>
            <span class="tag tag-interpretability">Threat Hunting</span>
            <a href="https://github.com/chalithah/detection-engineering-lab" class="tag tag-github">GITHUB</a>
        </div>
    </div>
</div>

<div class="publication-card">
    <div class="publication-image">
        <img src="assets/aws-waf-architecture.png" alt="AWS WAF DDoS Mitigation">
    </div>
    <div class="publication-content">
        <h3 class="publication-title">
            <a href="https://github.com/chalithah/Securing-REDCap-OWASP-AWS-WAF" class="publication-link">
                Cloud Defense: Mitigating Live DDoS Attacks
            </a>
        </h3>
        <div class="publication-venue">AWS WAF · AWS Shield · Fortinet Managed Rules</div>
        <div class="publication-year">2024</div>
        <div class="publication-description">
            Real-world incident response: Secured REDCap web application on AWS under active DDoS attack. Implemented AWS WAF with Fortinet Managed Rules to block OWASP Top 10 exploits (SQLi, XSS), stabilized HTTP 4xx error rates, and reduced malicious traffic. Integrated AWS Shield for volumetric attack mitigation and GuardDuty for continuous threat monitoring.
        </div>
        <div class="publication-tags">
            <span class="tag tag-safety">Cloud Security</span>
            <span class="tag tag-interpretability">DDoS Mitigation</span>
            <a href="https://github.com/chalithah/Securing-REDCap-OWASP-AWS-WAF" class="tag tag-github">GITHUB</a>
        </div>
    </div>
</div>

<div class="publication-card">
    <div class="publication-image">
        <img src="assets/splunk-claude-mcp.png" alt="AI Security Analyst">
    </div>
    <div class="publication-content">
        <h3 class="publication-title">
            <a href="https://github.com/chalithah/splunk-claude-mcp-agent" class="publication-link">
                AI Security Analyst: Splunk & Claude Integration
            </a>
        </h3>
        <div class="publication-venue">Python · Anthropic API · Splunk SDK · MCP</div>
        <div class="publication-year">2025</div>
        <div class="publication-description">
            Engineered a local Model Context Protocol (MCP) server bridging Claude AI with Splunk Enterprise for natural language threat hunting. The agent writes SPL queries, executes searches, and analyzes results without uploading sensitive data to the cloud. Successfully identified credential dumping attacks (Mimikatz/T1003) and Windows Defender evasion techniques through conversational AI interaction.
        </div>
        <div class="publication-tags">
            <span class="tag tag-safety">AI Engineering</span>
            <span class="tag tag-interpretability">Security Automation</span>
            <a href="https://github.com/chalithah/splunk-claude-mcp-agent" class="tag tag-github">GITHUB</a>
        </div>
    </div>
</div>

<div class="publication-card">
    <div class="publication-image">
        <img src="assets/tpot-attack-map.png" alt="T-Pot Honeypot">
    </div>
    <div class="publication-content">
        <h3 class="publication-title">
            <a href="https://github.com/chalithah/T-Pot-Honeypot-Cloud-Deployment" class="publication-link">
                Cloud Threat Intel: T-Pot Honeypot Analysis
            </a>
        </h3>
        <div class="publication-venue">T-Pot · Elastic Stack (ELK) · Kibana</div>
        <div class="publication-year">2024</div>
        <div class="publication-description">
            Deployed high-interaction honeypot on Vultr cloud to capture 4+ million real-world cyberattacks over 30 days. Analyzed global threat patterns using Elastic Stack, identifying credential stuffing campaigns, C2 callbacks, and exploit attempts targeting SSH/FTP/HTTP. Documented top attacker ASNs, common credentials, and malicious payloads for threat intelligence enrichment.
        </div>
        <div class="publication-tags">
            <span class="tag tag-safety">Threat Intelligence</span>
            <span class="tag tag-interpretability">Big Data Analysis</span>
            <a href="https://github.com/chalithah/T-Pot-Honeypot-Cloud-Deployment" class="tag tag-github">GITHUB</a>
        </div>
    </div>
</div>
