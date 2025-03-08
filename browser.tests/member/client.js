import { EventFactory, Types, MemberFactory } from "@ellementul/uee-core"

import { assertLog } from './test.utils.js'
import { WorkerTransport } from '../../index.js'

const room = new MemberFactory
const transport = new WorkerTransport({ isHost: false })
room.makeRoom({ transport: transport })
room.connect()

const event = EventFactory(Types.Object.Def({ system: "test" }))
const secondEvent = EventFactory(Types.Object.Def({ system: "test2" }))

room.subscribe(event, () => {
    assertLog("Client got message", true)
    room.send(secondEvent)
})

assertLog("Client loaded", true)