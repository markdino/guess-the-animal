import { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

const ParticipantContext = createContext({
  all: [],
  add: () => {},
  remove: () => {},
  update: () => {},
  nextPlayer: () => {},
  selectPlayer: () => {},
  player: {},
  addPlayerScore: () => {},
  minimumRequired: 3,
  setMinimuRequired: () => {},
  isQualified: false,
})

export const ParticipantContextProvider = ({ children }) => {
  const [participants, setParticipants] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [minimumRequired, setMinimuRequired] = useState(3)

  const addParticipant = (name) => {
    const participant = {
      id: uuid(),
      name,
      score: 0,
    }
    setParticipants([...participants, participant])
  }

  const removeParticipant = (id) => {
    const remainingParticipants = participants.filter((e) => e.id !== id)
    setParticipants(remainingParticipants)
  }

  const updateParticipant = (index, data) => {
    const mutableParticipants = [...participants]
    mutableParticipants[index] = data
    setParticipants(mutableParticipants)
  }

  const nextPlayer = () => {
    if (participants.length - 1 === playerIndex) {
      setPlayerIndex(0)
    } else {
      setPlayerIndex(playerIndex + 1)
    }
  }

  const selectPlayer = (id) => {
    setPlayerIndex(participants.findIndex((player) => player.id === id))
  }

  const addPlayerScore = (score) => {
    const updatedPlayer = { ...participants[playerIndex] }
    updatedPlayer.score += score
    updateParticipant(playerIndex, updatedPlayer)
  }

  const context = {
    all: participants,
    add: addParticipant,
    remove: removeParticipant,
    update: updateParticipant,
    nextPlayer,
    player: participants[playerIndex],
    selectPlayer,
    addPlayerScore,
    minimumRequired,
    setMinimuRequired: (event) => setMinimuRequired(event?.target?.value),
    isQualified: participants?.length >= minimumRequired,
  }

  return (
    <ParticipantContext.Provider value={context}>
      {children}
    </ParticipantContext.Provider>
  )
}

export default ParticipantContext
