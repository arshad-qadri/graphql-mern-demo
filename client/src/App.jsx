import { useState } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query getTodos {
    getTodos {
      id
      title
      userId
      user {
        name
      }
    }
  }
`;
function App() {
  const cellStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  };
  const { data, loading } = useQuery(query);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
      <tr>
        <th style={cellStyle}>Title</th>
        <th style={cellStyle}>Name</th>
      </tr>
    </thead>
    <tbody>
      {data.getTodos.map((todo) => (
        <tr key={todo.id}>
          <td style={cellStyle}>{todo.title}</td>
          <td style={cellStyle}>{todo.user.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
  
  );
}

export default App;
