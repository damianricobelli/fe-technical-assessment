import { Layout } from "./components/layout";

function App() {
  return (
    <Layout.Root>
      <Layout.Sidebar>
        <span>Sidebar menu</span>
      </Layout.Sidebar>
      <Layout.Header>
        <span>Header</span>
      </Layout.Header>
      <Layout.Content>
        <span>Content</span>
      </Layout.Content>
    </Layout.Root>
  );
}

export default App;
