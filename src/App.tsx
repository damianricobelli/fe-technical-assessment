import { Breadcrumb } from "./components/header/breadcrumb";
import { SearchInput } from "./components/header/search-input";
import { SortSelect } from "./components/header/sort-select";
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
        <Breadcrumb />
        <div className="flex items-center gap-2">
          <SortSelect />
          <SearchInput />
        </div>
      </Layout.Header>
      <Layout.Content>
        <span>Content</span>
      </Layout.Content>
    </Layout.Root>
  );
}

export default App;
