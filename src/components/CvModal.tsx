type CvModalProps = {
  onAgree: () => void;
  onCancel: () => void;
};

function Button({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded  transition-colors ${className}`}>
      {children}
    </button>
  );
}

export function CvModal({ onAgree, onCancel }: CvModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onCancel}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-indigo-400 transition-all duration-300 p-4 rounded-lg shadow-md max-w-xs text-center">
        <p className="text-white font-medium mb-3">Empezará la descarga de mi CV</p>
        <div className="flex justify-center gap-2">
          <Button onClick={onAgree} className="bg-indigo-500 text-white hover:bg-indigo-700">
            De acuerdo
          </Button>
          <Button onClick={onCancel} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
