#!/bin/bash

# Check if a folder name was provided as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <folder-name>"
    exit 1
fi

component_name="$1"

# Create the component directory
mkdir "$component_name"

# Create the component files using echo
echo "import React from 'react'
import { "$component_name"Provider } from './"$component_name"Context'

export default function $component_name() {
  return (
     <"$component_name"Provider><div>$component_name</div></"$component_name"Provider>
  )
}" > "$component_name/M$component_name.jsx"

# Create the context file using echo
echo "import React, { useContext, useState } from 'react'

export const "$component_name"Context = React.createContext({
  data: undefined,
  setData: async (data) => null,
})

export const use"$component_name" = () => useContext("$component_name"Context)

export const "$component_name"Provider = ({ children }) => {
  const ["$component_name", set"$component_name"] = useState()

  return <"$component_name"Context.Provider value={{ "$component_name", set"$component_name" }}>{children}</"$component_name"Context.Provider>
}

" > "$component_name/M"$component_name"Context.js"

# Output success message
echo "Component '$component_name' created successfully!"





