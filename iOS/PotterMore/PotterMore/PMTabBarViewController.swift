//
//  PMTabBarViewController.swift
//  PotterMore
//
//  Created by LinJia on 2020/3/18.
//  Copyright © 2020 linjia. All rights reserved.
//

import UIKit

class PMTabBarViewController: UITabBarController {
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        let newsStoryboard = UIStoryboard(name: "PMNews", bundle: nil)
        let newsController = newsStoryboard.instantiateViewController(withIdentifier: "PMNewsNavigationViewController")
        newsController.tabBarItem.title = "新闻";
        newsController.tabBarItem.image = UIImage(named: "tab_news")
        self.addChild(newsController)
        
        let archiveStoryboard = UIStoryboard(name: "PMArchive", bundle: nil)
        let archiveController = archiveStoryboard.instantiateViewController(withIdentifier: "PMArchiveNavigationViewController")
        archiveController.tabBarItem.title = "档案";
        archiveController.tabBarItem.image = UIImage(named: "tab_archive")
        self.addChild(archiveController)
        
        let discoverStoryboard = UIStoryboard(name: "PMDiscover", bundle: nil)
        let discoverController = discoverStoryboard.instantiateViewController(withIdentifier: "PMDiscoverNavigationViewController")
        discoverController.tabBarItem.title = "发现";
        discoverController.tabBarItem.image = UIImage(named: "tab_discover")
        self.addChild(discoverController)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
