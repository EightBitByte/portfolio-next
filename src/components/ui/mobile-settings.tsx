import { Menu } from "lucide-react";
import { Button } from "./button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { MobileThemeContent, MobileAchievementContent, MobileShopContent } from "./mobile-settings-content";

export default function MobileSettings() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu/>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full">
        <DrawerHeader>
          <DrawerTitle hidden>Settings</DrawerTitle>
          <DrawerDescription hidden>
            Modify theme, view achievements, and purchase items from the shop.
          </DrawerDescription>
        </DrawerHeader>
        <Tabs defaultValue="themes" className="w-full flex flex-col px-6 pb-6">
          <TabsList className="mx-auto mb-4">
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
          </TabsList>
          <TabsContent value="themes">
            <MobileThemeContent/>
          </TabsContent>
          <TabsContent value="achievements" className="overflow-y-scroll">
            <MobileAchievementContent/>
          </TabsContent>
          <TabsContent value="shop">
            <MobileShopContent/>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}