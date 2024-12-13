import React from "react";

const MailTable = ({ messages = [] }) => {
  return (
    <div className="mail-table">
      <h2>Submitted Messages</h2>
      {messages.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.phone}</td>
                <td>{message.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default MailTable;
