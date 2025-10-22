export const Datatable = () => {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="py-4">
          <tr className="border-b border-border text-body-sm-medium [&_th]:pb-4 [&_th]:text-left">
            <th className="w-1/3">Type</th>
            <th className="w-1/3">Name</th>
            <th className="w-[120px]">Tags</th>
            <th className="w-[140px]">Last Updated</th>
            <th className="w-[80px]">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          <tr className="border-b border-border [&_td]:py-4 [&_td]:align-middle [&_td]:whitespace-nowrap">
            <td>
              <span>Test</span>
            </td>
            <td>
              <span>Test</span>
            </td>
            <td>
              <span>Test</span>
            </td>
            <td>
              <span>Test</span>
            </td>
            <td>
              <span>Test</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
