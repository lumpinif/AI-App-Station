import { RingLoader } from "react-spinners"

export const LoadingSpinner = () => {
  return (
    <div className="grid h-full w-full place-content-center">
      <div
        role="status"
        aria-label="loading"
        className="flex items-center justify-center"
      >
        <span>
          <RingLoader size={50} speedMultiplier={1.5} color="gray" />
        </span>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
