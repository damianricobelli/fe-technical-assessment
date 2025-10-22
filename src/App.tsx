import { Layout } from "./components/layout";
import { Menu } from "./components/sidebar/menu";
import { NewWorkflowDialog } from "./components/sidebar/new-workflow-dialog";
import { Profile } from "./components/sidebar/profile";

function App() {
  return (
    <Layout.Root>
      <Layout.Sidebar>
        <Profile />
        <NewWorkflowDialog />
        <Menu />
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
