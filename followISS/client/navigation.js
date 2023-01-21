const tabs = document.querySelectorAll('.nav-item')
const tabInfo = document.querySelectorAll('.nav-link')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabValue)
        tabInfo.forEach(tabInfo => {
            tabInfo.classList.remove('active')
        })
        target.classList.add(' active')
    })
})