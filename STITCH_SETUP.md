# Google Stitch MCP Integration Setup

This project has **Google Stitch MCP** pre-configured for Antigravity IDE.

## What is Stitch?

Google Stitch is an AI-native design canvas that generates UI designs from text prompts. When connected to Antigravity via MCP, it lets the AI agent directly fetch designs and convert them into production code.

## Setup Steps

### 1. Get Your Stitch API Key

1. Go to [stitch.withgoogle.com](https://stitch.withgoogle.com/)
2. Sign in with your Google account
3. Click your **User Icon** → **Edit User Settings**
4. Under **API access keys**, click **Generate a Key**
5. Copy the key securely

### 2. Set the API Key

**Option A: Environment Variable (Recommended)**

```powershell
# In PowerShell, set before launching Antigravity:
$env:STITCH_API_KEY = "your-api-key-here"
```

**Option B: Add to MCP Config**

Edit `.agents/mcp_config.json` and add the key:

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "@_davideast/stitch-mcp", "proxy"],
      "env": {
        "STITCH_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### 3. Reload Antigravity

After setting the API key, reload Antigravity IDE (or restart it).
The Stitch MCP server will appear under **... → MCP Servers** in the Agent Panel.

### 4. Verify

Ask the agent: *"List my Stitch projects"* — if Stitch tools are available, it will call `list_projects` and show your designs.

## Available Stitch MCP Tools

Once connected, these tools become available to the agent:

| Tool | Description |
|------|-------------|
| `create_project` | Create a new Stitch design project |
| `list_projects` | List all your Stitch projects |
| `list_screens` | List screens in a project |
| `get_screen` | Get a specific screen's details + HTML |
| `generate_screen_from_text` | Generate UI from a text prompt |
| `edit_screens` | Edit screens with a text prompt |
| `generate_variants` | Generate design variants |
| `create_design_system` | Create design tokens/theme |
| `update_design_system` | Update design tokens |
| `list_design_systems` | List design systems |
| `apply_design_system` | Apply a design system to screens |

## Config File Locations

- **Global**: `~/.gemini/config/mcp_config.json`
- **Workspace**: `.agents/mcp_config.json` (this project)
