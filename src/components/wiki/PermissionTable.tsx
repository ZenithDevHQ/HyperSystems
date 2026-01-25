interface Permission {
  permission: string;
  description: string;
  default?: string;
}

interface PermissionTableProps {
  permissions: Permission[];
  title?: string;
}

export function PermissionTable({ permissions, title }: PermissionTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-hs-border">
      {title && (
        <div className="border-b border-hs-border bg-hs-surface-2 px-4 py-3">
          <h4 className="font-semibold text-hs-text">{title}</h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-hs-border bg-hs-surface">
              <th className="px-4 py-3 text-left text-sm font-semibold text-hs-text">
                Permission
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-hs-text">
                Description
              </th>
              {permissions.some((p) => p.default) && (
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-hs-text">
                  Default
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr
                key={index}
                className="border-b border-hs-border last:border-b-0 hover:bg-hs-surface-2"
              >
                <td className="px-4 py-3">
                  <code className="rounded bg-hs-surface-2 px-2 py-1 font-mono text-sm text-hs-primary">
                    {perm.permission}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-hs-text-muted">
                  {perm.description}
                </td>
                {permissions.some((p) => p.default) && (
                  <td className="whitespace-nowrap px-4 py-3">
                    {perm.default && (
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          perm.default === "true"
                            ? "bg-hs-success/20 text-hs-success"
                            : perm.default === "op"
                            ? "bg-hs-warning/20 text-hs-warning"
                            : "bg-hs-danger/20 text-hs-danger"
                        }`}
                      >
                        {perm.default}
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
