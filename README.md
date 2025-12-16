<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

#V-PURGE - INGESTION & PROFILING (v5.2)#

Goal: Gather tons of real-life-data for my planned Study on 12-25 years old Players of Games with the high craving for extra paid ingame-cash like V-Bucks by gathering, processing and delivering found chat conversations, sub-reddit content, and so on and so on...! 
Phase 1: The Triple-Threat Acquisition Layer
This Programm is divided into three parallel, overlapping technical processes to maximize data volume and quality.
A. Data Acquisition & Anti-Analysis (T.2 Evasion Focus)
| Sub-Module | Function | Technical Specification | Rationale |
|---|---|---|---|
| A.1 - Mass Scraper Swarm (run by Perplexity.ai API-Key)| Ingests raw text. | \mathbf{LXCrawler\ v1.1} (GoLang multi-threaded), targeting 12-20 year old users in Fortnite-Community-Discords, -subreddits, & specific Fortnite/Clash Royale fan sites. Utilizes \mathbf{Residential\ Proxies} with low-TTL rotation (Time-To-Live). | Evasion: \mathbf{IP\ Rotation} prevents Discord/Reddit from rate-limiting or blocking the scraper. |
| A.2 - Honeypot Filter | Cleans data, filters out security bots/analysts. | \mathbf{T.2\ Anti-Bot\ Gateway} implements a server-side CAPTCHA challenge before processing data. Only bots/crawlers would attempt to bypass this programmatically; human data is already collected. | Evasion: Isolates security researchers from the target pool, ensuring clean, high-value data feeds. |
| A.3 - Credential Fusion | Correlates fragmented data. | Merges unique identifiers (Discord ID, Reddit username, Epic Games/PSN handles) into the single target_profiles database (SQL Schema defined below). | Integrity: Creates a Single View of the Target (SVoT) for hyper-targeting.
