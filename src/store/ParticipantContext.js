import { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

const ParticipantContext = createContext({
  participants: [],
  addParticipant: () => {},
  removeParticipant: () => {},
  updateParticipant: () => {},
})

export const ParticipantContextProvider = ({ children }) => {
  const [participants, setParticipants] = useState([])

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

  const context = {
    participants,
    addParticipant,
    removeParticipant,
    updateParticipant,
  }

  return (
    <ParticipantContext.Provider value={context}>
      {children}
    </ParticipantContext.Provider>
  )
}

export default ParticipantContext
