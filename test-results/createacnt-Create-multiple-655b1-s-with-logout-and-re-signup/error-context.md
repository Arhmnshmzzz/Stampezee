# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e8]:
        - heading "StampEzee" [level=2] [ref=e10]
        - heading "Check your inbox!" [level=2] [ref=e11]
        - generic [ref=e13]:
          - generic [ref=e15]:
            - generic [ref=e16]:
              - text: Enter your code here
              - generic [ref=e17]: "*"
            - generic:
              - generic:
                - generic: "0"
                - generic: "0"
                - generic: "0"
                - generic: "0"
                - generic: "0"
                - generic: "0"
              - textbox [active] [ref=e18]: "000000"
          - button "Resend in 4m 55s" [disabled] [ref=e20]:
            - img [ref=e21]
            - text: Resend in 4m 55s
          - button "Verifying..." [disabled]
      - region "Notifications alt+T":
        - list:
          - listitem [ref=e26]:
            - img [ref=e28]
            - generic [ref=e31]: Email verified successfully
  - alert [ref=e32]
```