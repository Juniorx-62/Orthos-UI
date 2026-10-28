import json,urllib.request
repos="shadcn-ui/ui radix-ui/primitives ant-design/ant-design carbon-design-system/carbon microsoft/fluentui twbs/bootstrap tailwindlabs/headlessui primer/react mantinedev/mantine heroui-inc/heroui saadeghi/daisyui themesberg/flowbite mui/material-ui TanStack/table adobe/react-spectrum cloudscape-design/components hashicorp/design-system uswds/uswds alphagov/govuk-frontend ibelick/motion-primitives magicuidesign/magicui emilkowalski/sonner emilkowalski/vaul pacocoursey/cmdk uiverse-io/galaxy 21st-dev/21st lucide-icons/lucide react-hook-form/react-hook-form colinhacks/zod nhsuk/nhsuk-frontend gitlab-org/gitlab-services/design.gitlab.com 0xGF/boneyard".split()
for r in repos:
    try:
        d=json.load(urllib.request.urlopen(urllib.request.Request('https://api.github.com/repos/'+r,headers={'User-Agent':'x'}),timeout=20))
        print(r,'|',(d.get('license') or {}).get('spdx_id'),'|',d['stargazers_count'])
    except Exception as e: print(r,'| ERR',getattr(e,'code',e))
