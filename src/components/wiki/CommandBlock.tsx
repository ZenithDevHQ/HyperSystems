interface Command {
  command: string;
  description: string;
  permission?: string;
}

interface CommandBlockProps {
  commands: Command[];
  title?: string;
}

export function CommandBlock({ commands, title }: CommandBlockProps) {
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
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-hs-text">
                Command
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-hs-text">
                Description
              </th>
              {commands.some((c) => c.permission) && (
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-hs-text">
                  Permission
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {commands.map((cmd, index) => (
              <tr
                key={index}
                className="border-b border-hs-border last:border-b-0 hover:bg-hs-surface-2"
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <code className="rounded bg-hs-surface-2 px-2 py-1 font-mono text-sm text-hs-primary">
                    {cmd.command}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-hs-text-muted">
                  {cmd.description}
                </td>
                {commands.some((c) => c.permission) && (
                  <td className="whitespace-nowrap px-4 py-3">
                    {cmd.permission && (
                      <code className="rounded bg-hs-surface px-2 py-1 font-mono text-xs text-hs-text-muted">
                        {cmd.permission}
                      </code>
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
