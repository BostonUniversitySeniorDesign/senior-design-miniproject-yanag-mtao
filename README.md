# senior-design-miniproject Fall 2021

This is an expo-managed React Native mobile app that lets a user create and save recipes. Nutrition information for ingredients can be inputted manually, or populated automatically by scanning a barcode, which then is the input to an FDC API query.

Note: This app was only tested on an expo-managed workflow (ie through the Expo Go app) on an Android phone

## Demo video/screenshots

(Unmute for sound!)

https://user-images.githubusercontent.com/90095970/133820670-20cb1282-1e8e-4408-bf97-34b3b547001b.mp4


<p align="center">
<img src="https://user-images.githubusercontent.com/90095970/133824348-ec2e1e00-0157-44b5-b4e3-33ca948fe182.png" width="300">
 
  <i align="center">Login Screen: Displays a button which lets the user sign in with their google account.</i>
</p>




<p align="center">
<img src="https://user-images.githubusercontent.com/90095970/133822579-5a881318-58b9-4afc-8483-08564374fa7b.png" width="300">
</p>

_Home screen: Displays the user's google icon in the top right and the user's name in the center. Has a logout button in the bottom left, and a "new recipe" in the bottom right, which opens a model. Allows the user to select between existing recipes and to go to them._


<p align="center">
<img src="https://user-images.githubusercontent.com/90095970/133823196-0baf8420-5983-4d58-8b9a-39132f066784.png" width="300">
</p>

_New Recipe Modal: Allows the user to specify the name of their new recipe._


<p align="center">
<img src="https://user-images.githubusercontent.com/90095970/133823488-188a437d-bef5-47c6-a3e2-f6fb2b1d964a.png" width="300">
</p>

_Recipe Screen: Displays the name of the recipe at the top, and a table with all of the ingredients of the recipe. Each ingrient has a name, a number of servings, and calories per serving specified. Each ingredient can also be deleted. The total calories for the recipe is displayed near the bottom left. The recipe can be saved (which updates the data in the firestore database) or deleted. New ingredients can be added via the "add ingredients" button at the bottom right, which opens a modal._


<p align="center">
<img src="https://user-images.githubusercontent.com/90095970/133823849-7f75acb2-6c5f-4555-a8d2-b22a749a632d.png" width="300">
</p>

_New Ingredient Modal: Allows the user to  manually input info for their new ingredient, OR lets the fields get auto-populated using data from the FDC database, after taking a photo of the barcode._
