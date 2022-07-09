FROM nodered/node-red

USER root
RUN addgroup node-red dialout
USER node-red
RUN npm install node-red-contrib-modbus
RUN npm install node-red-node-serialport

