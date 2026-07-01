import sdk from '@repo/sdk-dashboard-react';
import { useState } from 'react';

const UserProjects = ({ userId }: { userId: string }) => {
  const { data: projects, isError, isLoading } = sdk.useUserProjects(userId);

  if (isLoading) {
    return <p>Loading projects…</p>;
  }

  if (isError) {
    return <p>Failed to load projects.</p>;
  }

  if (!projects?.length) {
    return <p>No projects.</p>;
  }

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
};

export const App = () => {
  const { data: users, isError, isLoading } = sdk.useUsers();
  const [selectedUserId, setSelectedUserId] = useState<null | string>(null);

  return (
    <main>
      <h1>Dashboard</h1>

      {isLoading && <p>Loading users…</p>}
      {isError && <p>Failed to load users.</p>}

      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <button
              onClick={() =>
                setSelectedUserId((current) =>
                  current === user.id ? null : user.id
                )
              }
              type="button"
            >
              {user.name}
            </button>

            {selectedUserId === user.id && <UserProjects userId={user.id} />}
          </li>
        ))}
      </ul>
    </main>
  );
};
