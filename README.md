# Project Template

## Architecture

SDK connects clients to the core.

### Clients-to-SDK connections

```mermaid
graph TD
    api-app
    api-dashboard
    cli-app
    cli-dashboard
    mcp-app
    mcp-dashboard
    mobile-app
    mobile-dashboard
    sdk-app
    sdk-app-react
    sdk-dashboard
    sdk-dashboard-react
    web-app
    web-dashboard

    api-app --> sdk-app
    api-dashboard --> sdk-dashboard
    cli-app --> sdk-app
    cli-dashboard --> sdk-dashboard
    mcp-app --> sdk-app
    mcp-dashboard --> sdk-dashboard
    mobile-app --> sdk-app-react
    mobile-dashboard --> sdk-dashboard-react
    web-app --> sdk-app-react
    web-dashboard --> sdk-dashboard-react

    sdk-app --> types-app
    sdk-dashboard --> types-dashboard
    sdk-app-react --> sdk-app
    sdk-dashboard-react --> sdk-dashboard
    types-app --> types
    types-dashboard --> types
```

### SDKs-to-core connections

```mermaid
graph TD
    core-app
    core-dashboard
    database-postgres
    sdk-app
    sdk-dashboard

    core-app --> database-postgres
    core-dashboard --> database-postgres

    sdk-app -->|calls| core-app
    sdk-dashboard -->|calls| core-dashboard
```
