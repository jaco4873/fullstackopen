const Header = ({ title }) => <h1>{title}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  parts.map(part => (
    <Part key={part.name} part={part}/>
  ))
);

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const calculateTotalExercises = (parts) => {
  return parts.reduce((sum, part) => sum + part.exercises, 0);
};

const Course = ({course}) => 
  <>
    <Header title={course.title}/>
    <Content parts={course.parts}/>
    <Total sum={calculateTotalExercises(course.parts)}/>
  </>

const App = () => {
  const course1 = {
    title: 'Half Stack application development',
    parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]
};


  return (
    <div>
      <Course course={course1} />
    </div>
  )
}



export default App