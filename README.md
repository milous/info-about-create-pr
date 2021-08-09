## Dogeneruje doplňující informace do Issue/PR

Číslo issue se detekuje z názvu větve, který je standardizovaný na `<číslo issue>_<nějaký popis>` (např. `4_test`)

```
name: Přidání informací o testserveru do ISSUE a PR

on:
  pull_request:
    types: [opened]

jobs:
  update_pr:
    runs-on: ubuntu-latest
    timeout-minutes: 2
    steps:
      - uses: milous/info-about-create-pr@master
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
          issue-body-prefix: "- Připraveno v PR: #{prNumber}\n- Testovací url: https://test{prNumber}.servers.coms/\n\n---"
          pr-body-suffix: |
            Issue: #{issueNumber}

            ```
            - Připraveno ve větvi `${{ github.head_ref }}`
            - Připraveno v PR: #${{ github.event.number }}
            - Testovací url: https://test${{ github.event.number }}.servers.coms
            ```
```
