#!/usr/bin/env python3

# This agent takes data from a PUSH source, build NGSI entities, eventually writes to a given Sink.
# https://fiware-orion.readthedocs.io/en/2.0.0/user/walkthrough_apiv2/index.html#entity-creation

from pyngsi.agent import NgsiAgent
from pyngsi.sources.source import Row
from pyngsi.sources.server import ServerHttpUpload
from pyngsi.sink import SinkStdout,SinkOrion
from pyngsi.ngsi import DataModel
import os 

FIWARE_HOST = os.getenv('FIWARE_HOST')
FIWARE_PORT = int(os.getenv('FIWARE_PORT'))

def build_entity(row: Row) -> DataModel:
    r = row.record
    m = DataModel(id=r['source'], type="variador-error") 
    m.add("source", r['source'])
    m.add("description",  "Data taken from"+ r['source'])
    m.add("registro", r['registry'])
    m.add("valor",r['value'])
    print(m)
    return m


def main():
    # You declare an HTTP server that acts as your Source, listening on port 8880
    src = ServerHttpUpload()

    # If you have an Orion server available, just replace SinkStdout() with SinkOrion()
    # sink = SinkOrion(FIWARE_HOST,FIWARE_PORT)
    sink = SinkOrion(FIWARE_HOST,FIWARE_PORT)

    # The agent processes JSON content received from the client
    agent = NgsiAgent.create_agent(src, sink, process=build_entity)

    agent.run()

    # The agent provides global statistics on its execution
    agent.close()


if __name__ == '__main__':
    main()