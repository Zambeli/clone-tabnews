import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <p>Ultima atualização: {updatedAtText} </p>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const database = data?.dependencies?.database;

  let databaseVersion = "Carregando...";
  let maxConnections = "Carregando...";
  let opennedConnections = "Carregando...";

  if (!isLoading && data) {
    databaseVersion = database.version;
    maxConnections = database.max_connections;
    opennedConnections = database.opened_connections;
  }

  return (
    <>
      <h3>Database</h3>
      <p>Conexões Máximas: {maxConnections}</p>
      <p>Conexões Abertas: {opennedConnections}</p>
      <p>Versão do Database: {databaseVersion}</p>
    </>
  );
}
