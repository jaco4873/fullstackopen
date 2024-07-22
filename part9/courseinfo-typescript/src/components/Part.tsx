import { CoursePart } from "../types"

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
          <br></br>
        </div>
      )
    case "group":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>project exercises {part.groupProjectCount}</p>
          <br></br>
        </div>
      )
    case "background":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
          <p>required background: {part.backgroundMaterial}</p>
          <br></br>
        </div>
      )
    case "special":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
          <p>required skills: {part.requirements.join(", ")}</p>
          <br></br>
        </div>
      )
  }
}

export default Part