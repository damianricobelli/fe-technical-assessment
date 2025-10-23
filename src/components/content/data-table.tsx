import {
  AlertCircleIcon,
  Edit2Icon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import { Dialog } from "../dialog";
import { TagsBadge } from "./tags-badge";
import { useFetcher } from "../../hooks/use-fetcher";
import { fetchFakeWorkflows, WorkflowsResponse } from "./fetch-fake-workflows";
import { cx } from "class-variance-authority";

export const Datatable = () => {
  // We could have used something as simple as a useEffect,
  // but due to the multiple problems it can have with race
  // conditions and how outdated it feels to do it that way
  // when there are more robust solutions available, I decided
  // to create a mini useFetcher (similar to the idea behind
  // loaders in react-router) to be able to fetch data
  // without useEffect.
  const { data, loading, error } =
    useFetcher<WorkflowsResponse>(fetchFakeWorkflows);

  if (loading) return <Status.Loading />;
  if (error) return <Status.Error error={error.message} />;
  if (!data) return <Status.NoData />;

  const workflows = data.data;

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="py-4">
          <tr className="border-b border-border text-body-sm-medium [&_th]:pb-4 [&_th]:text-left">
            <th className="w-[100px]">Type</th>
            <th className="w-1/2">Name</th>
            <th className="w-[100px]">Tags</th>
            <th className="w-[100px]">Last Updated</th>
            <th className="w-[80px]">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {workflows.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border [&_td]:py-4 [&_td]:align-middle [&_td]:whitespace-nowrap"
            >
              <td>
                <span className="text-body-xs-regular text-tertiary">
                  {item.type}
                </span>
              </td>
              <td>
                <span className="text-body-sm-medium">{item.name}</span>
              </td>
              <td>
                <TagsBadge
                  tags={item.tags.map((tag) => ({
                    id: tag.name,
                    name: tag.name,
                    color: tag.color,
                  }))}
                />
              </td>
              <td>
                <span className="text-body-xs-regular text-tertiary">
                  {item.lastUpdated}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Dialog.Root>
                    <Dialog.Trigger className="bg-black/5 rounded-md p-1.5">
                      <Edit2Icon className="size-3 cursor-pointer" />
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <h2 className="text-lg font-bold">Edit Workflow</h2>
                      <p className="text-sm text-secondary">
                        Edit the workflow description.
                      </p>
                    </Dialog.Content>
                  </Dialog.Root>
                  <Dialog.Root>
                    <Dialog.Trigger className="bg-black/5 rounded-md p-1.5">
                      <Trash2Icon className="size-3 cursor-pointer" />
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <h2 className="text-lg font-bold">Delete Workflow</h2>
                      <p className="text-sm text-secondary">
                        Are you sure you want to delete this workflow?
                      </p>
                      <div className="flex justify-end gap-2 mt-4">
                        <button className="px-2 py-1 rounded-md border border-red-500 text-red-500 text-body-xs-regular">
                          Delete
                        </button>
                        <button className="px-2 py-1 rounded-md border border-black/10 bg-black/5 text-black/50 text-body-xs-regular">
                          Cancel
                        </button>
                      </div>
                    </Dialog.Content>
                  </Dialog.Root>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LoadingStatus = () => {
  return (
    <div className={statusStyle}>
      <span className="flex items-center gap-2">
        <Loader2Icon className="size-8 animate-spin" />
        <span className="text-lg">Loading...</span>
      </span>
    </div>
  );
};

const ErrorStatus = ({ error }: { error: string }) => {
  return (
    <div className={statusStyle}>
      <span className="flex items-center gap-2 text-red-500">
        <AlertCircleIcon className="size-10" />
        <span className="text-xl">Error: {error}</span>
      </span>
    </div>
  );
};

const NoDataStatus = () => {
  return (
    <div className={statusStyle}>
      <span className="text-lg">No data</span>
    </div>
  );
};

const Status = {
  Loading: LoadingStatus,
  Error: ErrorStatus,
  NoData: NoDataStatus,
};

const statusStyle = cx("grid place-items-center h-full");
