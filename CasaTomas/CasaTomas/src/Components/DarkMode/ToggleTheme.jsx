const ToggleTheme = () => {
    const ToggleTheme = () => {
        const htmlElement = document.documentElement;
    
        if (htmlElement.classList.contains('dark')) {
            htmlElement.setAttribute('class', 'light');
        } else {
            htmlElement.setAttribute('class', 'dark');
        }
    }

    return (
        <div className="flex items-center">
        <span className="text-xl" role="img" aria-label="sun">
          🌞
        </span>
        <label className="relative inline-flex items-center cursor-pointer ml-3">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onClick={ToggleTheme}
          />
          <div className="-mt-1 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="text-xl" role="img" aria-label="sun">
          🌜
        </span>
         
        </label>
      </div>
      
    )
}

export default ToggleTheme;