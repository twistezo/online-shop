workflow "Build" {
  on = "push"
  resolves = ["Build (production)"]
}

action "Install packages" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "install"
}

action "Build (production)" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "run build"
  needs = ["Install packages"]
}

workflow "Deploy to GitHub page" {
  on = "push"
  resolves = [
    "Deploy",
    "Install",
  ]
}

action "Install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "install"
}

action "Deploy" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Install"]
  args = "run deploy"
  secrets = ["GITHUB_TOKEN"]
}
