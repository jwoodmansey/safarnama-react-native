package com.safarnama.safarnama.generated;

import java.util.Arrays;
import java.util.List;

import expo.modules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.av.AVPackage(),
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.filesystem.FileSystemPackage()
        //new expo.modules.imageloader.ImageLoaderPackage()
    );
  }
}
