// import cookiesFunc from "@/plugins/cookies"
// const cookies = cookiesFunc()
// setters

export const setSelectedUser = (val) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedUser", JSON.stringify(val))
  }
}

export const getSelectedUser = () => {
  if (typeof window !== "undefined") {
    const val = localStorage.getItem("selectedUser")
    if (val !== "undefined") {
      return JSON.parse(val)
    }
    return null
  }
}
