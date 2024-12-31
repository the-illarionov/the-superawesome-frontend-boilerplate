ARG NODE_IMAGE="node:22.12"

FROM ${NODE_IMAGE}

RUN apt update && apt install lsof

# lsof is needed to get process id (running server) and then kill it and launch again